import React from 'react';
import { Table } from '../../table/Table';
import { fetchOAuthClients } from '../../../apis';

const dataSource = () => ({
  fn: fetchOAuthClients,
  clientSideSearch: true,
  params: () => ({}),
  transform: result => ({
    data: result.oauthClients,
  }),
});

const columns = [
  {
    value: 'clientId',
    title: 'Client ID',
    filterable: true,
    sortable: true,
  },
  {
    value: 'description',
    title: 'Description',
    filterable: false,
    sortable: false,
  },
  {
    value: 'name',
    title: 'Name',
    filterable: true,
    sortable: true,
  },
  {
    value: 'redirectUri',
    title: 'Redirect URI',
    filterable: false,
    sortable: true,
  },
];

export const OAuthClientTable = props => (
  <Table
    tableKey={props.tableKey}
    components={{
      ...props.components,
    }}
    dataSource={dataSource()}
    columns={columns}
    alterColumns={props.alterColumns}
    addColumns={props.addColumns}
    columnSet={props.columnSet}
    pageSize={props.pageSize}
  >
    {props.children}
  </Table>
);

OAuthClientTable.defaultProps = {
  columns,
};
