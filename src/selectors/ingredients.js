import { createSelector } from 'reselect';

export const getIngredients = state => state.ingredients;

export const getAllIngredients = createSelector(
  getIngredients,
  ingredients => ingredients.collection
);

export const getCachedIngredients = createSelector(
  getIngredients,
  ingredients => ingredients.cache
);

export const getIngredientsPager = createSelector(
  getIngredients,
  ingredients => ingredients.pager
);

export const getIngredient = createSelector(
  getIngredients,
  ingredients => ingredients.ingredient
);
