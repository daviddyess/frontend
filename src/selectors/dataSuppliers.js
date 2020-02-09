import { createSelector } from 'reselect';

export const getDataSuppliers = state => state.dataSuppliers;

export const getAllDataSuppliers = createSelector(
  getDataSuppliers,
  dataSuppliers => dataSuppliers.collection
);

export const getCachedDataSuppliers = createSelector(
  getDataSuppliers,
  dataSuppliers => dataSuppliers.cache
);

export const getDataSuppliersPager = createSelector(
  getDataSuppliers,
  dataSuppliers => dataSuppliers.pager
);

export const getDataSupplier = createSelector(
  getDataSuppliers,
  dataSuppliers => dataSuppliers.dataSupplier
);
