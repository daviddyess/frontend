import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Table } from 'react-bootstrap';
import { actions as rolesActions } from 'reducers/roles';
import { getRoleUsers } from 'selectors/roles';

export default function RoleUsers({ role }) {
  RoleUsers.propTypes = {
    role: PropTypes.object
  };

  const dispatch = useDispatch();
  const roleUsers = useSelector(getRoleUsers);

  useEffect(() => {
    dispatch(rolesActions.requestRoleUsers({ roleId: role.id }));
  }, []);

  return (
    <Fragment>
      <h3>{role.name} Role Users</h3>
      {!roleUsers ? (
        <Alert>No Users Assigned to this Role!</Alert>
      ) : (
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {roleUsers.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{user.userId}</td>
                  <td className="text-center">{user.User.UserProfile.name}</td>
                  <td className="text-center">{user.User.emailAddress}</td>
                  <td>
                    <Button>Unassign Role</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
}
