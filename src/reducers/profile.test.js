import { reducer, types, actions } from './profile';

describe('users reducer', () => {
  const error = { message: 'Failed' };
  const profile = {};
  const collection = {};
  const userId = 3;

  it('has REQUEST_PROFILE action', () => {
    expect(actions.requestProfile(userId)).toEqual({
      type: types.REQUEST_PROFILE,
      userId
    });
  });

  it('reduces REQUEST_PROFILE action', () => {
    const action = actions.requestProfile(userId);

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_PROFILE_SUCCESS action', () => {
    expect(actions.requestProfileSuccess(profile)).toEqual({
      type: types.REQUEST_PROFILE_SUCCESS,
      profile
    });
  });

  it('reduces REQUEST_PROFILE_SUCCESS action', () => {
    const action = actions.requestProfileSuccess(profile);
    const mockState = {
      collection: {}
    };

    expect(reducer(mockState, action)).toEqual({
      collection
    });
  });

  it('has REQUEST_PROFILE_FAILURE action', () => {
    expect(actions.requestProfileFailure(error)).toEqual({
      type: types.REQUEST_PROFILE_FAILURE,
      error
    });
  });

  it('reduces REQUEST_PROFILE_FAILURE action', () => {
    const action = actions.requestProfileFailure(error);

    expect(reducer({}, action)).toEqual({
      error
    });
  });

  it('has REQUEST_CURRENT_USER_PROFILE action', () => {
    expect(actions.requestCurrentUserProfile()).toEqual({
      type: types.REQUEST_CURRENT_USER_PROFILE
    });
  });

  it('reduces REQUEST_CURRENT_USER_PROFILE action', () => {
    const action = actions.requestCurrentUserProfile();

    expect(reducer({}, action)).toEqual({});
  });

  it('has UPDATE_PROFILE action', () => {
    expect(actions.updateProfile({ profile })).toEqual({
      type: types.UPDATE_PROFILE,
      profile
    });
  });

  it('reduces UPDATE_PROFILE action', () => {
    const action = actions.updateProfile({ profile });

    expect(reducer({}, action)).toEqual({});
  });

  it('has UPDATE_PROFILE_SUCCESS action', () => {
    expect(actions.updateProfileSuccess(profile)).toEqual({
      type: types.UPDATE_PROFILE_SUCCESS,
      profile
    });
  });

  it('reduces UPDATE_PROFILE_SUCCESS action', () => {
    const action = actions.updateProfileSuccess(profile);
    const mockState = {
      collection: {}
    };

    expect(reducer(mockState, action)).toEqual({
      collection
    });
  });

  it('has UPDATE_PROFILE_FAILURE action', () => {
    expect(actions.updateProfileFailure(error)).toEqual({
      type: types.UPDATE_PROFILE_FAILURE,
      error
    });
  });

  it('reduces UPDATE_PROFILE_FAILURE action', () => {
    const action = actions.updateProfileFailure(error);

    expect(reducer({}, action)).toEqual({
      error
    });
  });
});
