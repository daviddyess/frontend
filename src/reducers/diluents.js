import { buildActions } from 'utils';

export const types = buildActions('diluents', [
  'REQUEST_DILUENT',
  'REQUEST_DILUENT_SUCCESS',
  'REQUEST_DILUENTS',
  'REQUEST_DILUENTS_SUCCESS',
  'REQUEST_FAILURE'
]);

const requestDiluent = diluentId => ({
  type: types.REQUEST_DILUENT,
  diluentId
});

const requestDiluentSuccess = diluent => ({
  type: types.REQUEST_DILUENT_SUCCESS,
  diluent
});

const requestDiluents = pager => ({
  type: types.REQUEST_DILUENTS,
  pager
});

const requestDiluentsSuccess = (diluents, pager) => ({
  type: types.REQUEST_DILUENTS_SUCCESS,
  diluents,
  pager
});

const requestFailure = error => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestDiluent,
  requestDiluentSuccess,
  requestDiluents,
  requestDiluentsSuccess,
  requestFailure
};

export const initialState = {
  diluent: {},
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
    case types.REQUEST_DILUENT_SUCCESS:
      return {
        ...state,
        diluent: action.diluent
      };
    case types.REQUEST_DILUENTS_SUCCESS:
      return {
        ...state,
        cache: action.diluents,
        collection: action.diluents[action.pager.page],
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
