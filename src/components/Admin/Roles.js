import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Table } from 'react-bootstrap';
import { PagerInfo, withPagination } from 'components/Pagination/Pagination';
import { actions as rolesActions } from 'reducers/roles';
import { getAllRoles, getRolesPager } from 'selectors/roles';
import RoleEditor from 'components/Admin/Roles/Editor';

export default withPagination(
  rolesActions.requestRoles,
  getAllRoles,
  getRolesPager
)(function Roles({ pager, pagerNavigation }) {
  Roles.propTypes = {
    pager: PropTypes.object.isRequired,
    pagerNavigation: PropTypes.node.isRequired
  };
  const collection = useSelector(getAllRoles);
  const noEdit = (role) => {
    // Don't allow editing of Adminstrator or User roles
    return role === 'Administrator' || role === 'User' ? true : false;
  };
  const [showEditor, setShowEditor] = useState({ id: null });
  const [showUsers, setShowUsers] = useState({ id: null });
  const [assignRole, setAssignRole] = useState({ id: null });
  const handleRoleEditor = (id) => {
    setShowEditor({ id });
  };
  const handleRoleUsers = (id) => {
    setShowUsers({ id });
  };
  const handleAssignRole = (id) => {
    setAssignRole({ id });
  };

  return (
    <Col>
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
                    <Button size="sm" onClick={() => handleRoleUsers(role.id)}>
                      Users
                    </Button>
                    <Button size="sm" onClick={() => handleAssignRole(role.id)}>
                      Assign
                    </Button>
                    {!noEdit(role.name) && (
                      <Button
                        size="sm"
                        onClick={() => handleRoleEditor(role.id)}
                      >
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
                {showEditor.id === role.id ? (
                  <tr>
                    <td colSpan="3">
                      <RoleEditor role={role} />
                    </td>
                  </tr>
                ) : null}
                {showUsers.id === role.id ? (
                  <tr>
                    <td colSpan="3">Users</td>
                  </tr>
                ) : null}
                {assignRole.id === role.id ? (
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
