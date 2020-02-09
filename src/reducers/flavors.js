import { buildActions } from 'utils';

export const types = buildActions('flavors', [
  'REQUEST_FLAVOR',
  'REQUEST_FLAVOR_SUCCESS',
  'REQUEST_FLAVORS',
  'REQUEST_FLAVORS_SUCCESS',
  'REQUEST_FAILURE'
]);

const requestFlavor = flavorId => ({
  type: types.REQUEST_FLAVOR,
  flavorId
});

const requestFlavorSuccess = flavor => ({
  type: types.REQUEST_FLAVOR_SUCCESS,
  flavor
});

const requestFlavors = pager => ({
  type: types.REQUEST_FLAVORS,
  pager
});

const requestFlavorsSuccess = (flavors, pager) => ({
  type: types.REQUEST_FLAVORS_SUCCESS,
  flavors,
  pager
});

const requestFailure = error => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestFlavor,
  requestFlavorSuccess,
  requestFlavors,
  requestFlavorsSuccess,
  requestFailure
};

export const initialState = {
  flavor: {},
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
    case types.REQUEST_FLAVOR_SUCCESS:
      return {
        ...state,
        flavor: action.flavor
      };
    case types.REQUEST_FLAVORS_SUCCESS:
      return {
        ...state,
        cache: action.flavors,
        collection: action.flavors[action.pager.page],
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
