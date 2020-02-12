import { buildActions } from 'utils';

export const types = buildActions('vendor', [
  'REQUEST_VENDOR',
  'REQUEST_VENDOR_SUCCESS',
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

const requestFailure = error => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestVendor,
  requestVendorSuccess,
  requestFailure
};

export const initialState = {
  collection: {}
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_VENDOR_SUCCESS:
      return {
        ...state,
        collection: action.vendor
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
