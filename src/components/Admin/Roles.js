import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import { Button, Col, Table } from 'react-bootstrap';
import { PagerInfo, withPagination } from 'components/Pagination/Pagination';
import { actions as editorActions } from 'reducers/editor';
import { actions as rolesActions } from 'reducers/roles';
import { getEditorStatus } from 'selectors/editor';
import { getAllRoles, getRolesPager } from 'selectors/roles';
import RoleEditor from 'components/Admin/Roles/Editor';

export default withPagination(
  rolesActions.requestRoles,
  getAllRoles,
  getRolesPager
)(function Roles({ collection, pager, pagerNavigation }) {
  Roles.propTypes = {
    pager: PropTypes.object.isRequired,
    pagerNavigation: PropTypes.node.isRequired
  };

  const displayEditor = useSelector(getEditorStatus);

  const noEdit = (role) => {
    // Don't allow editing of Adminstrator or User roles
    return role === 'Administrator' || role === 'User' ? true : false;
  };

  const dispatch = useDispatch();

  const handleRoleEditor = (id) => {
    dispatch(
      editorActions.displayEditor({
        editor: 'adminRole',
        status: id
      })
    );
  };

  const handleRoleUsers = (id) => {
    dispatch(
      editorActions.displayEditor({
        editor: 'adminRoleUsers',
        status: id
      })
    );
  };

  const handleAssignRole = (id) => {
    dispatch(
      editorActions.displayEditor({
        editor: 'adminRoleUser',
        status: id
      })
    );
  };

  return (
    <Col>
      <Breadcrumbs base="admin" active="Roles" />
      <h2>Roles</h2>
      {pagerNavigation}
      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {collection.map((role, index) => {
            return (
              <Fragment key={index}>
                <tr>
                  <td className="text-center">{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <Button
                      onClick={() => handleRoleUsers(role.id)}
                      className="mr-1"
                    >
                      Users
                    </Button>
                    <Button
                      onClick={() => handleAssignRole(role.id)}
                      className="mr-1"
                    >
                      Assign
                    </Button>
                    {!noEdit(role.name) && (
                      <Button
                        onClick={() => handleRoleEditor(role.id)}
                        className="mr-1"
                      >
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
                {displayEditor.adminRole === role.id ? (
                  <tr>
                    <td colSpan="3">
                      <RoleEditor role={role} />
                    </td>
                  </tr>
                ) : null}
                {displayEditor.adminRoleUsers === role.id ? (
                  <tr>
                    <td colSpan="3">Users</td>
                  </tr>
                ) : null}
                {displayEditor.adminRoleUser === role.id ? (
                  <tr>
                    <td colSpan="3">Assign Role</td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </Table>
      {pagerNavigation}
      <PagerInfo contentType="Roles" pager={pager} />
    </Col>
  );
});
