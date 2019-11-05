import { reducer, types, actions } from './profile';

describe('users reducer', () => {
  const error = { message: 'Failed' };
  const user = [];
  const profile = [];

  it('has REQUEST_CURRENT_USER_PROFILE action', () => {
    expect(actions.requestCurrentUserProfile()).toEqual({
      type: types.REQUEST_CURRENT_USER_PROFILE
    });
  });

  it('reduces REQUEST_CURRENT_USER_PROFILE action', () => {
    const action = actions.requestCurrentUserProfile();

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_CURRENT_USER_PROFILE_SUCCESS action', () => {
    expect(actions.requestCurrentUserProfileSuccess(profile)).toEqual({
      type: types.REQUEST_CURRENT_USER_PROFILE_SUCCESS,
      profile
    });
  });

  it('reduces REQUEST_CURRENT_USER_PROFILE_SUCCESS action', () => {
    const action = actions.requestCurrentUserProfileSuccess(profile);
    const mockState = {
      user: []
    };

    expect(reducer(mockState, action)).toEqual({
      user
    });
  });

  it('has REQUEST_CURRENT_USER_PROFILE_FAILURE action', () => {
    expect(actions.requestCurrentUserProfileFailure(error)).toEqual({
      type: types.REQUEST_CURRENT_USER_PROFILE_FAILURE,
      error
    });
  });

  it('reduces REQUEST_CURRENT_USER_PROFILE_FAILURE action', () => {
    const action = actions.requestCurrentUserProfileFailure(error);

    expect(reducer({}, action)).toEqual({
      error
    });
  });

  it('has UPDATE_CURRENT_USER_PROFILE action', () => {
    expect(actions.updateCurrentUserProfile({ profile })).toEqual({
      type: types.UPDATE_CURRENT_USER_PROFILE,
      profile
    });
  });

  it('reduces UPDATE_CURRENT_USER_PROFILE action', () => {
    const action = actions.updateCurrentUserProfile({ profile });

    expect(reducer({}, action)).toEqual({});
  });

  it('has UPDATE_CURRENT_USER_PROFILE_SUCCESS action', () => {
    expect(actions.updateCurrentUserProfileSuccess({ profile })).toEqual({
      type: types.UPDATE_CURRENT_USER_PROFILE_SUCCESS,
      profile
    });
  });

  it('reduces UPDATE_CURRENT_USER_PROFILE_SUCCESS action', () => {
    const action = actions.updateCurrentUserProfileSuccess(profile);
    const mockState = {
      user: []
    };

    expect(reducer(mockState, action)).toEqual({
      user
    });
  });

  it('has UPDATE_CURRENT_USER_PROFILE_FAILURE action', () => {
    expect(actions.updateCurrentUserProfileFailure(error)).toEqual({
      type: types.UPDATE_CURRENT_USER_PROFILE_FAILURE,
      error
    });
  });

  it('reduces UPDATE_CURRENT_USER_PROFILE_FAILURE action', () => {
    const action = actions.updateCurrentUserProfileFailure(error);

    expect(reducer({}, action)).toEqual({
      error
    });
  });
});
