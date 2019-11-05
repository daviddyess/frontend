import { getProfile, getCurrentUserProfile, getProfiles } from './profile';
import { initialState } from 'reducers/profile';

describe('profile selectors', () => {
  const state = { profile: initialState };
  const { user, collection } = initialState;

  it('can getProfile', () => {
    expect(getProfile(state)).toBe(state.profile);
  });

  it('can getCurrentUserProfile', () => {
    expect(getCurrentUserProfile(state)).toBe(user);
  });

  it('can getProfiles', () => {
    expect(getProfiles(state)).toBe(collection);
  });
});
