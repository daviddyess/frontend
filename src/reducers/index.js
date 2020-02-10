import { combineReducers } from 'redux';
import {
  reducer as application,
  initialState as applicationState
} from './application';
import {
  reducer as dashboard,
  initialState as dashboardState
} from './dashboard';
import { reducer as flavors, initialState as flavorsState } from './flavors';
import { reducer as roles, initialState as rolesState } from './roles';
import { reducer as toast, initialState as toastState } from './toast';
import { reducer as users, initialState as usersState } from './users';
import { reducer as vendors, initialState as vendorsState } from './vendors';

export const initialState = {
  application: applicationState,
  dashboard: dashboardState,
  flavors: flavorsState,
  roles: rolesState,
  toast: toastState,
  users: usersState,
  vendors: vendorsState
};

export default combineReducers({
  application,
  dashboard,
  flavors,
  roles,
  toast,
  users,
  vendors
});
