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
import {
  reducer as ingredients,
  initialState as ingredientsState
} from './ingredients';
import {
  reducer as ingredientCategory,
  initialState as ingredientCategoryState
} from './ingredientCategory';
import {
  reducer as ingredientCategories,
  initialState as ingredientCategoriesState
} from './ingredientCategories';
import { reducer as roles, initialState as rolesState } from './roles';
import { reducer as toast, initialState as toastState } from './toast';
import { reducer as users, initialState as usersState } from './users';

export const initialState = {
  application: applicationState,
  dashboard: dashboardState,
  flavors: flavorsState,
  ingredients: ingredientsState,
  ingredientCategory: ingredientCategoryState,
  ingredientCategories: ingredientCategoriesState,
  roles: rolesState,
  toast: toastState,
  users: usersState
};

export default combineReducers({
  application,
  dashboard,
  flavors,
  ingredients,
  ingredientCategory,
  ingredientCategories,
  roles,
  toast,
  users
});
