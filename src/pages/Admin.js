import { Helmet } from 'react-helmet';
import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import { Container, Row, Col } from 'react-bootstrap';
import { AdminPanel, Roles } from 'components/Admin';

export default function Admin() {
  return (
    <Container>
      <Helmet title="Administration" />
      <Row>
        <Col>
          <h1>Administration</h1>
        </Col>
      </Row>
      <Row>
        <Switch>
          <PrivateRoute exact path="/admin" component={AdminPanel} />
          <PrivateRoute path="/admin/roles" component={Roles} />
        </Switch>
      </Row>
    </Container>
  );
}
