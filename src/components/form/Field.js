import React from 'react';
import t from 'prop-types';

const typeToComponent = {
  text: 'TextField',
  'text-multi': 'TextMultiField',
  checkbox: 'CheckboxField',
  code: 'CodeField',
  'code-template': 'CodeTemplateField',
  password: 'PasswordField',
  radio: 'RadioField',
  select: 'SelectField',
  'select-multi': 'SelectMultiField',
  attributes: 'AttributesField',
  team: 'TeamField',
  'team-multi': 'TeamMultiField',
  user: 'UserField',
  'user-multi': 'UserMultiField',
};

export const Field = props => {
  const componentName = typeToComponent[props.type] || 'TextField';
  const FieldImpl =
    props.components.field ||
    props.components.form[componentName] ||
    props.components.context.get(componentName);
  return <FieldImpl {...props} />;
};

Field.propTypes = {
  /** The key of the field. */
  key: t.string,
  /** The name of the field defined in the forms config. */
  name: t.string,
  /** The id of the field. `formKey-fieldName` */
  id: t.string,
  /** The label of the field defined in the forms config. */
  label: t.string,
  /** The options of the field defined in the forms config. Set if the field is a select, radio or checkbox */
  options: t.array,
  /** The type of the field defined in the forms config. */
  type: t.string,
  /** The value of the field. */
  value: t.string,
  /** The on focus function. */
  onFocus: t.func,
  /** The on blur function. */
  onBlur: t.func,
  /** The on change function. */
  onChange: t.func,
  /** If the field should be visible. */
  visible: t.bool,
  /** If the field should be required. */
  required: t.bool,
  /** The placeholder text defined in the forms config. */
  placeholder: t.string,
  /** If the field should be enabled. */
  enabled: t.bool,
  /** If the field is dirty (has changed). */
  dirty: t.bool,
  /** If the field is valid (no errors based on constraints). */
  valid: t.bool,
  /** If the field should be focused. */
  focused: t.bool,
  /** If the field has been touched. */
  touched: t.bool,
  /** Errors pertaining to the field. */
  errors: t.array,
  /** Components provided to the field */
  components: t.objectOf(t.array),
  /** Any render attributes defined in the fields config. */
  renderAttributes: t.object,
};

const defaultProps = {
  visible: true,
};

Field.defaultProps = defaultProps;
