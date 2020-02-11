import { buildActions } from 'utils';

export const types = buildActions('ingredients', [
  'REQUEST_INGREDIENT',
  'REQUEST_INGREDIENT_SUCCESS',
  'REQUEST_INGREDIENTS',
  'REQUEST_INGREDIENTS_SUCCESS',
  'REQUEST_FAILURE'
]);

const requestIngredient = ingredientId => ({
  type: types.REQUEST_INGREDIENT,
  ingredientId
});

const requestIngredientSuccess = ingredient => ({
  type: types.REQUEST_INGREDIENT_SUCCESS,
  ingredient
});

const requestIngredients = pager => ({
  type: types.REQUEST_INGREDIENTS,
  pager
});

const requestIngredientsSuccess = (ingredients, pager) => ({
  type: types.REQUEST_INGREDIENTS_SUCCESS,
  ingredients,
  pager
});

const requestFailure = error => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestIngredient,
  requestIngredientSuccess,
  requestIngredients,
  requestIngredientsSuccess,
  requestFailure
};

export const initialState = {
  ingredient: {},
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
    case types.REQUEST_INGREDIENT_SUCCESS:
      return {
        ...state,
        ingredient: action.ingredient
      };
    case types.REQUEST_INGREDIENTS_SUCCESS:
      return {
        ...state,
        cache: action.ingredients,
        collection: action.ingredients[action.pager.page],
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
