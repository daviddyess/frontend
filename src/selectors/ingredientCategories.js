import { createSelector } from 'reselect';

export const getIngredientCategories = state => state.ingredientCategories;

export const getAllIngredientCategories = createSelector(
  getIngredientCategories,
  ingredientCategories => ingredientCategories.collection
);

export const getCachedIngredientCategories = createSelector(
  getIngredientCategories,
  ingredientCategories => ingredientCategories.cache
);

export const getIngredientCategoriesPager = createSelector(
  getIngredientCategories,
  ingredientCategories => ingredientCategories.pager
);
