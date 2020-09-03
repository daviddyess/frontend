import { Helmet } from 'react-helmet';
import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Stats from './Stats';

export default function AdminPanel() {
  const panels = [
    {
      name: 'Ingredients',
      icon: 'bezier-curve',
      menu: [
        {
          name: 'Flavors',
          icon: 'eye-dropper',
          title: 'Manage Flavors',
          url: 'admin/flavors'
        }
      ]
    },
    {
      name: 'Roles',
      icon: 'user-shield',
      menu: [
        {
          name: 'Roles',
          icon: 'user-shield',
          title: 'Manage Roles',
          url: '/admin/roles'
        }
      ]
    },
    {
      name: 'Users',
      icon: 'users',
      menu: [
        {
          name: 'Users',
          icon: 'users-cog',
          title: 'Manage Users',
          url: '/admin/users'
        }
      ]
    },
    {
      name: 'Database',
      icon: 'database',
      menu: [
        {
          name: 'Migrations',
          icon: 'clock',
          title: 'Data Migrations',
          url: '/admin/migrations'
        }
      ]
    }
  ];

  return (
    <Col>
      <Helmet title="Administration - Home" />
      <Breadcrumbs base="home" active="Admin" />
      <Row>
        {panels &&
          panels.map((panel, index) => {
            return (
              <Col key={index} xs={1} sm={3}>
                <Card border="info">
                  <Card.Header className="text-center">
                    <FontAwesomeIcon icon={panel.icon} /> {panel.name}
                  </Card.Header>
                  <Card.Body>
                    {panel.menu.map((link, linkIndex) => {
                      return (
                        <h3 key={linkIndex}>
                          <FontAwesomeIcon icon={link.icon} />
                          <Link className="ml-3" to={link.url}>
                            {link.name}
                          </Link>
                        </h3>
                      );
                    })}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
      <Row className="pt-3">
        <Stats />
      </Row>
    </Col>
  );
}
