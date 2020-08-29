import { Helmet } from 'react-helmet';
import React from 'react';
import { Col } from 'react-bootstrap';

export default function AdminPanel() {
  return (
    <Col>
      <Helmet title="Administration - Home" />
      The new admin panel
    </Col>
  );
}
