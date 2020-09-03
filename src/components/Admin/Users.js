import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import { Button, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PagerInfo, withPagination } from 'components/Pagination/Pagination';
import { actions as editorActions } from 'reducers/editor';
import { actions as usersActions } from 'reducers/users';
import { getEditorStatus } from 'selectors/editor';
import { getAllUsers, getUsersPager } from 'selectors/users';

export default withPagination(
  usersActions.requestUsers,
  getAllUsers,
  getUsersPager
)(function Users({ collection, pager, pagerNavigation }) {
  Users.propTypes = {
    collection: PropTypes.array.isRequired,
    pager: PropTypes.object.isRequired,
    pagerNavigation: PropTypes.node.isRequired
  };

  const displayEditor = useSelector(getEditorStatus);

  const dispatch = useDispatch();

  const handleEditor = (editor, status) => {
    dispatch(
      editorActions.displayEditor({
        editor,
        status
      })
    );
  };

  const yesIcon = () => {
    return <FontAwesomeIcon icon="check" color="green" title="Yes" />;
  };

  const noIcon = () => {
    return <FontAwesomeIcon icon="times" color="red" title="No" />;
  };

  return (
    <Col>
      <Breadcrumbs base="admin" active="Users" />
      <h2>Users</h2>
      {pagerNavigation}
      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Activated</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {collection.map((user, index) => {
            return (
              <Fragment key={index}>
                <tr>
                  <td className="text-center">{user.id}</td>
                  <td className="text-center">
                    <a
                      href={`/user/${user.UserProfile.name}`}
                      title={`${user.UserProfile.name}'s Profile`}
                    >
                      {user.UserProfile.name}
                    </a>
                  </td>
                  <td className="text-center">{user.emailAddress}</td>
                  <td className="text-center">
                    {user.activationCode === null ? yesIcon() : noIcon()}
                  </td>
                  <td className="text-center">
                    <Button
                      onClick={() => handleEditor('adminUserRoles', user.id)}
                      className="mr-1"
                    >
                      Roles
                    </Button>
                  </td>
                </tr>
                {displayEditor.adminUserRoles === user.id ? (
                  <tr>
                    <td colSpan="5">Roles</td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </Table>
      {pagerNavigation}
      <PagerInfo contentType="Users" pager={pager} />
    </Col>
  );
});
