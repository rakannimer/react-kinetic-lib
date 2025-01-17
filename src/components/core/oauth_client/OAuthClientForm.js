import React from 'react';
import { Form } from '../../form/Form';
import {
  fetchOAuthClient,
  createOAuthClient,
  updateOAuthClient,
} from '../../../apis';

const dataSources = ({ clientId }) => ({
  client: [
    fetchOAuthClient,
    [{ clientId }],
    {
      transform: result => result.client,
      runIf: () => !!clientId,
    },
  ],
});

const handleSubmit = ({ clientId }) => values =>
  (clientId ? updateOAuthClient : createOAuthClient)({
    clientId,
    client: values.toJS(),
  }).then(({ client, error }) => {
    if (error) {
      throw (error.statusCode === 400 && error.message) ||
        'There was an error saving the OAuth Client';
    }
    return client;
  });

const getOrBlank = (from, what) => bindings =>
  bindings[from] ? bindings[from].get(what) : '';

const fields = ({ clientId }) => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    initialValue: getOrBlank('client', 'name'),
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    required: false,
    initialValue: getOrBlank('client', 'description'),
  },
  {
    name: 'clientId',
    label: 'Client ID',
    type: 'text',
    required: true,
    initialValue: getOrBlank('client', 'clientId'),
  },
  {
    name: 'clientSecret',
    label: 'Client Secret',
    type: 'password',
    visible: ({ values }) => values.get('changeClientSecret'),
    required: ({ values }) => values.get('changeClientSecret'),
    transient: ({ values }) => !values.get('changeClientSecret'),
  },
  {
    name: 'changeClientSecret',
    label: 'Change Client Secret',
    type: 'checkbox',
    transient: true,
    // in "new" mode we do not show this toggle field and default it to true
    visible: !!clientId,
    initialValue: !clientId,
    onChange: ({ values }, { setValue }) => {
      if (values.get('clientSecret') !== '') {
        setValue('clientSecret', '');
      }
    },
  },
  {
    name: 'redirectUri',
    label: 'Redirect URI',
    type: 'text',
    required: true,
    initialValue: getOrBlank('client', 'redirectUri'),
  },
];

export const OAuthClientForm = ({
  addFields,
  alterFields,
  fieldSet,
  formKey,
  components,
  onSave,
  onError,
  children,
  ...formOptions
}) => (
  <Form
    addFields={addFields}
    alterFields={alterFields}
    fieldSet={fieldSet}
    formKey={formKey}
    components={components}
    onSubmit={handleSubmit(formOptions)}
    onSave={onSave}
    onError={onError}
    dataSources={dataSources(formOptions)}
    fields={fields(formOptions)}
  >
    {children}
  </Form>
);
