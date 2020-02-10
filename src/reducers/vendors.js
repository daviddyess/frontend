import { buildActions } from 'utils';

export const types = buildActions('vendors', [
  'REQUEST_VENDOR',
  'REQUEST_VENDOR_SUCCESS',
  'REQUEST_VENDORS',
  'REQUEST_VENDORS_SUCCESS',
  'REQUEST_FAILURE'
]);

const requestVendor = vendorId => ({
  type: types.REQUEST_VENDOR,
  vendorId
});

const requestVendorSuccess = vendor => ({
  type: types.REQUEST_VENDOR_SUCCESS,
  vendor
});

const requestVendors = pager => ({
  type: types.REQUEST_VENDORS,
  pager
});

const requestVendorsSuccess = (vendors, pager) => ({
  type: types.REQUEST_VENDORS_SUCCESS,
  vendors,
  pager
});

const requestFailure = error => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestVendor,
  requestVendorSuccess,
  requestVendors,
  requestVendorsSuccess,
  requestFailure
};

export const initialState = {
  vendor: {},
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
    case types.REQUEST_VENDOR_SUCCESS:
      return {
        ...state,
        vendor: action.vendor
      };
    case types.REQUEST_VENDORS_SUCCESS:
      return {
        ...state,
        cache: action.vendors,
        collection: action.vendors[action.pager.page],
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
