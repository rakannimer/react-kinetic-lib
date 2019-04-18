import React from 'react';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { fromJS, is, List, Map, OrderedMap, Set } from 'immutable';
import { action, connect, dispatch, regHandlers, regSaga } from '../../store';
import { AttributesField } from './AttributesField';
import { MembershipsField } from './MembershipsField';
import { TextMultiField } from './TextMultiField';

export const getTimestamp = () => Math.floor(new Date().getTime() / 1000);
const identity = it => it;

export const isEmpty = value =>
  value === null ||
  value === undefined ||
  (value.hasOwnProperty('length') && value.length === 0);

const convertDataSource = ([fn, args = [], options = {}]) =>
  fromJS({
    fn,
    argsFn: typeof args === 'function' ? args : () => args,
    options,
  });

export const initializeDataSources = dataSources =>
  resolveAncestorDependencies(Map(dataSources).map(convertDataSource));

const resolveAncestorDependencies = (
  dataSources,
  ancestorsMap = Map({ values: Set() }),
) => {
  const nextAncestorsMap = dataSources
    .map(dataSource => dataSource.getIn(['options', 'dependencies'], List()))
    .filter(deps => deps.every(dep => ancestorsMap.has(dep)))
    .reduce(
      (reduction, deps, name) =>
        reduction.set(
          name,
          deps.toSet().concat(deps.flatMap(dep => ancestorsMap.get(dep))),
        ),
      ancestorsMap,
    );

  if (dataSources.keySeq().every(name => ancestorsMap.has(name))) {
    return dataSources.map((dataSource, name) =>
      dataSource.setIn(
        ['options', 'ancestorDependencies'],
        ancestorsMap
          .get(name)
          .toList()
          .sort(),
      ),
    );
  } else {
    if (!nextAncestorsMap.equals(ancestorsMap)) {
      return resolveAncestorDependencies(dataSources, nextAncestorsMap);
    } else {
      throw 'Could not resolve dependency graph due to missing or cyclic dependencies';
    }
  }
};

const defaultFieldProps = fromJS({
  enabled: true,
  options: [],
  required: false,
  visible: true,
  dirty: false,
  focused: false,
  touched: false,
  errors: [],
  custom: {},
});

const dynamicFieldProps = List([
  'enabled',
  'initialValue',
  'options',
  'required',
  'visible',
]);

const selectDataSourcesData = formKey => state =>
  state
    .getIn(['forms', formKey, 'dataSources'])
    .map(dataSource => dataSource.get('data'))
    .toObject();

const selectValues = formKey => state =>
  state.getIn(['forms', formKey, 'fields']).map(field => field.get('value'));

const selectBindings = formKey => state => ({
  ...selectDataSourcesData(formKey)(state),
  values: selectValues(formKey)(state),
});

const evaluateFieldProps = (props, bindings) => field =>
  props.reduce(
    (updatedField, prop) =>
      updatedField.hasIn(['functions', prop])
        ? updatedField.set(
            prop,
            updatedField.getIn(['functions', prop])(bindings),
          )
        : updatedField,
    field,
  );

const convertField = field =>
  dynamicFieldProps.reduce(
    (acc, prop) =>
      typeof field[prop] === 'function'
        ? acc.setIn(['functions', prop], field[prop]).set(prop, null)
        : acc,
    Map(defaultFieldProps).merge(field),
  );

regHandlers({
  SETUP_FORM: (state, { payload: { formKey, dataSources, fields } }) =>
    state.setIn(
      ['forms', formKey],
      Map({
        dataSources: initializeDataSources(dataSources),
        fields: OrderedMap(
          fields.map(convertField).map(field => [field.get('name'), field]),
        ),
        state: Map(),
      }),
    ),
  EVAL_INITIAL_VALUES: (state, { payload: { formKey } }) => {
    const bindings = selectDataSourcesData(formKey)(state);
    return state
      .updateIn(['forms', formKey, 'fields'], fields =>
        fields
          .map(evaluateFieldProps(['initialValue'], bindings))
          .map(field => field.set('value', field.get('initialValue'))),
      )
      .setIn(['forms', formKey, 'valuesInitialized'], true);
  },
  EVAL_FIELDS: (state, { payload: { formKey } }) => {
    const bindings = selectBindings(formKey)(state);
    return state
      .updateIn(['forms', formKey, 'fields'], fields =>
        fields.map(
          evaluateFieldProps(
            ['enabled', 'options', 'required', 'visible'],
            bindings,
          ),
        ),
      )
      .setIn(['forms', formKey, 'fieldsInitialized'], true);
  },
  SET_VALUE: (state, { payload: { formKey, name, value } }) =>
    state.updateIn(['forms', formKey, 'fields', name], field =>
      field.merge({
        value,
        touched: true,
        dirty: !is(value, field.get('initialValue')),
      }),
    ),
  SET_FIELD_CUSTOM: (state, { payload: { formKey, name, path, value } }) =>
    state.setIn(['forms', formKey, 'fields', name, 'custom', ...path], value),
  FOCUS_FIELD: (state, { payload: { formKey, field } }) =>
    state.setIn(['forms', formKey, 'fields', field, 'focused'], true),
  BLUR_FIELD: (state, { payload: { formKey, field } }) =>
    state
      .setIn(['forms', formKey, 'fields', field, 'focused'], false)
      .setIn(['forms', formKey, 'fields', field, 'touched'], true),
  TEARDOWN_FORM: (state, action) =>
    state.deleteIn(['forms', action.payload.formKey]),
  VALIDATE: (state, { payload: { formKey } }) =>
    state.updateIn(['forms', formKey, 'fields'], fields =>
      fields.map(field =>
        field.set(
          'errors',
          field.get('required') && isEmpty(field.get('value'))
            ? List(['is required'])
            : List(),
        ),
      ),
    ),
  CALL_DATA_SOURCE: (state, { payload: { formKey, name, args } }) =>
    state.setIn(['forms', formKey, 'dataSources', name, 'args'], args),
  RESOLVE_DATA_SOURCE: (
    state,
    { payload: { formKey, shared, name, data: nativeData, timestamp, args } },
  ) => {
    const data = fromJS(nativeData);
    const updateShared = shared
      ? state.setIn(['dataSources', name], Map({ data, timestamp, args }))
      : state;
    return updateShared.mergeIn(['forms', formKey, 'dataSources', name], {
      data,
      args,
    });
  },
});

regSaga(
  takeEvery('SETUP_FORM', function*({ payload }) {
    const { formKey } = payload;
    const dataSources = yield select(state =>
      state.getIn(['forms', formKey, 'dataSources']),
    );

    // To kick things off we want to evaluate data sources with no dependencies.
    // The values for these initial evaluates will also not be available.
    const values = {};
    yield all(
      dataSources
        .filter(ds => ds.getIn(['options', 'dependencies'], List()).isEmpty())
        .keySeq()
        .map(name =>
          put({
            type: 'CHECK_DATA_SOURCE',
            payload: { formKey, name, values },
          }),
        )
        .toArray(),
    );
  }),
);

regSaga(
  takeEvery('CHECK_DATA_SOURCE', function*({ payload }) {
    const { formKey, name } = payload;
    const { args: prevArgs, argsFn, options } = yield select(state =>
      state.getIn(['forms', formKey, 'dataSources', name]).toObject(),
    );
    const dataSources = yield select(state =>
      state.getIn(['forms', formKey, 'dataSources']),
    );
    const values = yield select(state =>
      state.getIn(['forms', formKey, 'valuesInitialized'])
        ? state
            .getIn(['forms', formKey, 'fields'])
            .map(field => field.get('value'))
        : null,
    );
    const dependencies = dataSources
      .filter((ds, name) => options.get('dependencies', List()).contains(name))
      .map(ds => ds.get('data'))
      .toJS();

    const args = fromJS(argsFn({ ...dependencies, values }));
    if (!args.equals(prevArgs)) {
      const data = yield select(state =>
        state.getIn(['dataSources', name, 'data']),
      );
      const timestamp = yield select(state =>
        state.getIn(['dataSources', name, 'timestamp']),
      );
      if (options.get('shared') && data) {
        yield put({
          type: 'RESOLVE_DATA_SOURCE',
          payload: { formKey, name, data, args },
        });
      } else {
        yield put({
          type: 'CALL_DATA_SOURCE',
          payload: { formKey, name, args },
        });
      }
    }
  }),
);

regSaga(
  takeEvery('CALL_DATA_SOURCE', function*({ payload }) {
    const { formKey, name, args } = payload;
    const { fn, options } = yield select(state =>
      state.getIn(['forms', formKey, 'dataSources', name]).toObject(),
    );
    const shared = options.get('shared');
    const transform = options.get('transform', identity);
    const data = transform(yield call(fn, ...args.toJS()));
    const timestamp = yield call(getTimestamp);
    yield put({
      type: 'RESOLVE_DATA_SOURCE',
      payload: { formKey, name, shared, data, timestamp },
    });
  }),
);

const isResolved = dataSource => dataSource.has('data');
const dependsOn = (name, includeAncestors) => dataSource =>
  dataSource
    .getIn(
      ['options', includeAncestors ? 'ancestorDependencies' : 'dependencies'],
      List(),
    )
    .includes(name);

regSaga(
  takeEvery('RESOLVE_DATA_SOURCE', function*({ payload }) {
    const { formKey, name } = payload;
    const [dataSources, valuesInitialized] = yield select(state => [
      state.getIn(['forms', formKey, 'dataSources']),
      state.getIn(['forms', formKey, 'valuesInitialized']),
    ]);
    yield all(
      dataSources
        .filter(dependsOn(name))
        .keySeq()
        .map(name => put(action('CHECK_DATA_SOURCE', { formKey, name })))
        .toArray(),
    );
    if (
      dataSources.filterNot(dependsOn('values', true)).every(isResolved) &&
      !valuesInitialized
    ) {
      yield put(action('EVAL_INITIAL_VALUES', { formKey }));
    }
    if (dataSources.every(isResolved) && valuesInitialized) {
      yield put(action('EVAL_FIELDS', { formKey }));
    }
  }),
);

regSaga(
  takeEvery('EVAL_INITIAL_VALUES', function*({ payload: { formKey } }) {
    const dataSources = yield select(state =>
      state.getIn(['forms', formKey, 'dataSources']),
    );
    const actions = dataSources
      .filter(dependsOn('values'))
      .keySeq()
      .map(name => put(action('CHECK_DATA_SOURCE', { formKey, name })));

    if (actions.isEmpty()) {
      yield put(action('EVAL_FIELDS', { formKey }));
    } else {
      yield all(actions.toArray());
    }
  }),
);

regSaga(
  takeEvery('SET_VALUE', function*({ payload: { formKey } }) {
    const dataSources = yield select(state =>
      state.getIn(['forms', formKey, 'dataSources']),
    );
    yield put(action('EVAL_FIELDS', { formKey }));
    yield all(
      dataSources
        .filter(dependsOn('values'))
        .keySeq()
        .map(name => put(action('CHECK_DATA_SOURCE', { formKey, name })))
        .toArray(),
    );
  }),
);

regSaga(
  takeEvery('REJECT_DATA_SOURCE', function*({ payload }) {
    console.error('REJECT_DATA_SOURCE', payload);
  }),
);

export const setupForm = payload => {
  dispatch('SETUP_FORM', payload);
};

export const teardownForm = ({ formKey }) => {
  dispatch('TEARDOWN_FORM', { formKey });
};

export const onFocus = ({ formKey, field }) => () => {
  dispatch('FOCUS_FIELD', { formKey, field });
};

export const onBlur = ({ formKey, field }) => () => {
  dispatch('BLUR_FIELD', { formKey, field });
};

export const onChange = ({ formKey }) => event => {
  if (event.target.type === 'checkbox') {
    dispatch('SET_VALUE', {
      formKey,
      name: event.target.name,
      value: event.target.checked,
    });
  } else if (
    event.target.type === 'attributes' ||
    event.target.type === 'memberships'
  ) {
    dispatch('SET_VALUE', {
      formKey,
      name: event.target.name,
      value: event.target.value,
    });
  } else {
    dispatch('SET_VALUE', {
      formKey,
      name: event.target.name,
      value: event.target.value,
    });
  }
  dispatch('VALIDATE', { formKey });
};

export const onSubmit = (onSubmit, values) => event => {
  event.preventDefault();
  onSubmit(values);
};

export const setFieldCustom = ({ formKey, name }) => (path, value) => {
  dispatch('SET_FIELD_CUSTOM', { formKey, name, path, value });
};

export const mapStateToProps = (state, props) =>
  state.getIn(['forms', props.formKey], Map()).toObject();

export const SelectField = props => (
  <div className="field">
    <label htmlFor={props.id || props.name}>{props.label}</label>
    <select
      id={props.id || props.name}
      name={props.name}
      value={props.value || ''}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onFocus={props.onFocus}
    >
      <option />
      {props.options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const TextField = props => (
  <div className="field">
    <label htmlFor={props.id || props.name}>{props.label}</label>
    <input
      type="text"
      id={props.id || props.name}
      name={props.name}
      value={props.value || ''}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onFocus={props.onFocus}
    />
  </div>
);

export const CheckboxField = props => (
  <div className="field">
    <input
      type="checkbox"
      id={props.id || props.name}
      name={props.name}
      checked={props.value || false}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onFocus={props.onFocus}
    />
    <label htmlFor={props.id || props.name}>{props.label}</label>
  </div>
);

export const Field = props => {
  switch (props.type) {
    case 'select':
      return <SelectField {...props} />;
    case 'checkbox':
      return <CheckboxField {...props} />;
    case 'attributes':
      return <AttributesField {...props} />;
    case 'memberships':
      return <MembershipsField {...props} />;
    case 'text-multi':
      return <TextMultiField {...props} />;
    default:
      return <TextField {...props} />;
  }
};

export const Form = connect(mapStateToProps)(props => (
  <form onSubmit={onSubmit(props.onSubmit, props.values)}>
    {props.fieldsInitialized &&
      props.fields.toList().map(field => (
        <Field
          key={field.get('name')}
          name={field.get('name')}
          id={field.get('id')}
          label={field.get('label')}
          options={field.get('options')}
          type={field.get('type')}
          value={field.get('value')}
          onFocus={onFocus({
            formKey: props.formKey,
            field: field.get('name'),
          })}
          onBlur={onBlur({ formKey: props.formKey, field: field.get('name') })}
          onChange={onChange({ formKey: props.formKey })}
          dirty={field.get('dirty')}
          valid={field.get('valid')}
          focused={field.get('focused')}
          touched={field.get('touched')}
          errors={field.get('errors')}
          custom={field.get('custom')}
          setCustom={setFieldCustom({
            formKey: props.formKey,
            name: field.get('name'),
          })}
          component={props.components[field.get('name')]}
        />
      ))}
    <button type="submit">Submit</button>
  </form>
));
