import { createSelector } from 'reselect';

export const getProfile = state => state.profile;

export const getUserProfiles = createSelector(
  getProfile,
  profile => profile.cache
);

export const getUserProfile = createSelector(
  getProfile,
  profile => profile.collection
);
