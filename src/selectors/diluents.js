import { createSelector } from 'reselect';

export const getDiluents = state => state.diluents;

export const getAllDiluents = createSelector(
  getDiluents,
  diluents => diluents.collection
);

export const getCachedDiluents = createSelector(
  getDiluents,
  diluents => diluents.cache
);

export const getDiluentsPager = createSelector(
  getDiluents,
  diluents => diluents.pager
);

export const getDiluent = createSelector(
  getDiluents,
  diluents => diluents.diluent
);
