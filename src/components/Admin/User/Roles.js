import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Table } from 'react-bootstrap';
import { actions as usersActions } from 'reducers/users';
import { getUserRoles } from 'selectors/users';

export default function UserRoles({ user, roleId }) {
  UserRoles.propTypes = {
    user: PropTypes.object,
    roleId: PropTypes.number
  };

  const dispatch = useDispatch();
  const roles = useSelector(getUserRoles);

  useEffect(() => {
    dispatch(usersActions.requestUserRoles({ userId: user.id }));
  }, []);

  return (
    <Fragment>
      <h3>{user.User.UserProfile.name} User Roles</h3>
      {!roles ? (
        <Alert>No Roles Assigned to this User!</Alert>
      ) : (
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => {
              const roleAssigned =
                roleId && roleId === role.Role.id
                  ? 'dashboard-highlight'
                  : null;

              return (
                <tr key={index}>
                  <td className="text-center">{role.Role.id}</td>
                  <td className={roleAssigned}>{role.Role.name}</td>
                  <td>
                    <Button className="mr-1">Other Users</Button>

                    <Button className="mr-1">Unassign Role</Button>
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
