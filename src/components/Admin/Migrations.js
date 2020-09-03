import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import { Col, Table } from 'react-bootstrap';
import { actions as dashboardActions } from 'reducers/dashboard';
import { getMigrations } from 'selectors/dashboard';

export default function Migrations() {
  const dispatch = useDispatch();
  const migrations = useSelector(getMigrations);

  useEffect(() => {
    dispatch(dashboardActions.requestMigrations());
  }, []);

  return (
    <Col>
      <Helmet title="Database Migrations - Administration" />
      <Breadcrumbs base="admin" active="Database" />
      <h2>Database Migrations</h2>
      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Ran</th>
            <th>MD5</th>
          </tr>
        </thead>
        <tbody>
          {migrations.map((migration, index) => {
            if (index === 0) {
              return;
            }
            return (
              <tr key={index}>
                <td>{migration.version}</td>
                <td>{migration.name}</td>
                <td>{migration.runAt}</td>
                <td>{migration.md5}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Col>
  );
}
