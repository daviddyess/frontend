import { buildActions } from 'utils';

export const types = buildActions('dataSuppliers', [
  'REQUEST_DATA_SUPPLIER',
  'REQUEST_DATA_SUPPLIER_SUCCESS',
  'REQUEST_DATA_SUPPLIERS',
  'REQUEST_DATA_SUPPLIERS_SUCCESS',
  'REQUEST_FAILURE'
]);

const requestDataSupplier = dataSupplierId => ({
  type: types.REQUEST_DATA_SUPPLIER,
  dataSupplierId
});

const requestDataSupplierSuccess = dataSupplier => ({
  type: types.REQUEST_DATA_SUPPLIER_SUCCESS,
  dataSupplier
});

const requestDataSuppliers = pager => ({
  type: types.REQUEST_DATA_SUPPLIERS,
  pager
});

const requestDataSuppliersSuccess = (dataSuppliers, pager) => ({
  type: types.REQUEST_DATA_SUPPLIERS_SUCCESS,
  dataSuppliers,
  pager
});

const requestFailure = error => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestDataSupplier,
  requestDataSupplierSuccess,
  requestDataSuppliers,
  requestDataSuppliersSuccess,
  requestFailure
};

export const initialState = {
  dataSupplier: {},
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
    case types.REQUEST_DATA_SUPPLIER_SUCCESS:
      return {
        ...state,
        dataSupplier: action.dataSupplier
      };
    case types.REQUEST_DATA_SUPPLIERS_SUCCESS:
      return {
        ...state,
        cache: action.dataSuppliers,
        collection: action.dataSuppliers[action.pager.page],
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
