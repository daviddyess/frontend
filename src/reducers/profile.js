import { buildActions } from 'utils';

export const types = buildActions('profile', [
  'REQUEST_CURRENT_USER_PROFILE',
  'REQUEST_CURRENT_USER_PROFILE_SUCCESS',
  'REQUEST_CURRENT_USER_PROFILE_FAILURE',
  'UPDATE_CURRENT_USER_PROFILE',
  'UPDATE_CURRENT_USER_PROFILE_SUCCESS',
  'UPDATE_CURRENT_USER_PROFILE_FAILURE'
]);

const requestCurrentUserProfile = () => ({
  type: types.REQUEST_CURRENT_USER_PROFILE
});

const requestCurrentUserProfileSuccess = profile => ({
  type: types.REQUEST_CURRENT_USER_PROFILE_SUCCESS,
  profile
});

const requestCurrentUserProfileFailure = error => ({
  type: types.REQUEST_CURRENT_USER_PROFILE_FAILURE,
  error
});

const updateCurrentUserProfile = ({ profile }) => ({
  type: types.UPDATE_CURRENT_USER_PROFILE,
  profile
});

const updateCurrentUserProfileSuccess = profile => ({
  type: types.UPDATE_CURRENT_USER_PROFILE_SUCCESS,
  profile
});

const updateCurrentUserProfileFailure = error => ({
  type: types.UPDATE_CURRENT_USER_PROFILE_FAILURE,
  error
});

export const actions = {
  requestCurrentUserProfile,
  requestCurrentUserProfileSuccess,
  requestCurrentUserProfileFailure,
  updateCurrentUserProfile,
  updateCurrentUserProfileSuccess,
  updateCurrentUserProfileFailure
};

export const initialState = {
  collection: [],
  user: []
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_CURRENT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.profile
      };
    case types.REQUEST_CURRENT_USER_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.UPDATE_CURRENT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.profile
      };
    case types.UPDATE_CURRENT_USER_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
