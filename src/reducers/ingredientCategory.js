import { buildActions } from 'utils';

export const types = buildActions('ingredientCategory', [
  'REQUEST_INGREDIENT_CATEGORY',
  'REQUEST_INGREDIENT_CATEGORY_SUCCESS',
  'REQUEST_FAILURE'
]);

const requestIngredientCategory = ingredientCategoryId => ({
  type: types.REQUEST_INGREDIENT_CATEGORY,
  ingredientCategoryId
});

const requestIngredientCategorySuccess = category => ({
  type: types.REQUEST_INGREDIENT_CATEGORY_SUCCESS,
  category
});

const requestFailure = error => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestIngredientCategory,
  requestIngredientCategorySuccess,
  requestFailure
};

export const initialState = {
  collection: {}
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        collection: action.category
      };
    case types.REQUEST_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
