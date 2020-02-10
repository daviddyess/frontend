import { combineReducers } from 'redux';
import {
  reducer as application,
  initialState as applicationState
} from './application';
import {
  reducer as dashboard,
  initialState as dashboardState
} from './dashboard';
import { reducer as diluents, initialState as diluentsState } from './diluents';
import { reducer as flavors, initialState as flavorsState } from './flavors';
import { reducer as roles, initialState as rolesState } from './roles';
import { reducer as toast, initialState as toastState } from './toast';
import { reducer as users, initialState as usersState } from './users';

export const initialState = {
  application: applicationState,
  dashboard: dashboardState,
  diluent: diluentsState,
  flavors: flavorsState,
  roles: rolesState,
  toast: toastState,
  users: usersState
};

export default combineReducers({
  application,
  dashboard,
  diluents,
  flavors,
  roles,
  toast,
  users
});
