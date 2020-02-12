import { createSelector } from 'reselect';

export const getIngredientCategory = state => state.ingredientCategory;

export const getCategory = createSelector(
  getIngredientCategory,
  ingredientCategory => ingredientCategory.collection
);
