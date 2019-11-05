import { createSelector } from 'reselect';

export const getProfile = state => state.profile;

export const getCurrentUserProfile = createSelector(
  getProfile,
  profile => profile.user
);

export const getProfiles = createSelector(
  getProfile,
  profile => profile.collection
);
