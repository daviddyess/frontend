import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, CardColumns, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as dashboardActions } from 'reducers/dashboard';
import { getStats } from 'selectors/dashboard';

export default function Stats() {
  const dispatch = useDispatch();
  const stats = useSelector(getStats);

  useEffect(() => {
    dispatch(dashboardActions.requestStats());
  }, []);

  const refresh = () => {
    dispatch(dashboardActions.requestStats());
  };

  const {
    activatedUsers,
    flavors,
    flavorTags,
    recipes,
    recipeTags,
    tags,
    users,
    userTokens,
    vendors
  } = stats;

  return (
    <Col>
      <CardColumns>
        <Card bg="danger" text="white">
          <Card.Header>Users: {users}</Card.Header>
          <Card.Body>
            <h3>Activated Users: {activatedUsers}</h3>
            <h3>Inactive Users: {users - activatedUsers}</h3>
            <h3>Active Tokens: {userTokens}</h3>
          </Card.Body>
        </Card>
        <Card bg="primary" text="white">
          <Card.Body>
            <h2>Tags: {tags}</h2>
          </Card.Body>
        </Card>
        <Card bg="secondary" text="white">
          <Card.Body>
            <h2>Vendors: {vendors}</h2>
          </Card.Body>
        </Card>
        <Card bg="info" text="white">
          <Card.Header>Flavors: {flavors}</Card.Header>
          <Card.Body>
            <h2>Tags: {flavorTags}</h2>
          </Card.Body>
        </Card>
        <Card bg="warning" text="white">
          <Card.Header>Recipes: {recipes}</Card.Header>
          <Card.Body>
            <h2>Tags: {recipeTags}</h2>
          </Card.Body>
        </Card>
      </CardColumns>
      <a href="#home" onClick={() => refresh()} title="Refresh Stats">
        <FontAwesomeIcon icon="sync" />
      </a>
    </Col>
  );
}
