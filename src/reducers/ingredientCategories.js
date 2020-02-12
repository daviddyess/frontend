import { buildActions } from 'utils';

export const types = buildActions('ingredientCategories', [
  'REQUEST_INGREDIENT_CATEGORIES',
  'REQUEST_INGREDIENT_CATEGORIES_SUCCESS',
  'REQUEST_FAILURE'
]);

const requestIngredientCategories = pager => ({
  type: types.REQUEST_INGREDIENT_CATEGORIES,
  pager
});

const requestIngredientCategoriesSuccess = (categories, pager) => ({
  type: types.REQUEST_INGREDIENT_CATEGORIES_SUCCESS,
  categories,
  pager
});

const requestFailure = error => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestIngredientCategories,
  requestIngredientCategoriesSuccess,
  requestFailure
};

export const initialState = {
  cache: [],
  collection: [],
  pager: {
    count: null,
    limit: 100,
    page: 1,
    pages: null
  }
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_INGREDIENT_CATEGORIES_SUCCESS:
      return {
        ...state,
        cache: action.categories,
        collection: action.categories[action.pager.page],
        pager: {
          ...state.pager,
          ...action.pager
        }
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
