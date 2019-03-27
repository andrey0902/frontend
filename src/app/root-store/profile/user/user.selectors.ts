import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProfileState} from '../profile.reducer';


export const UserFeatureSelector = createFeatureSelector('profile');

export const selectUser = createSelector(
  UserFeatureSelector,
  (state: ProfileState) => state.user.user
);
