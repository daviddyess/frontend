import { Helmet } from 'react-helmet';
import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import { Col } from 'react-bootstrap';

export default function AdminPanel() {
  const panels = [
    {
      name: 'Roles',
      url: '/admin/roles'
    }
  ];

  return (
    <Col>
      <Helmet title="Administration - Home" />
      <Breadcrumbs base="home" active="Admin" />
      The new admin panel
      <ul>
        {panels &&
          panels.map((panel, index) => {
            return (
              <li key={index}>
                <Link to={panel.url}>{panel.name}</Link>
              </li>
            );
          })}
      </ul>
    </Col>
  );
}
