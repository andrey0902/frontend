import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CurrentUserState} from './current-user.reducer';

export const CurrentUserFeatureSelector = createFeatureSelector('currentUser');

export const selectCurrentUser = createSelector(
  CurrentUserFeatureSelector,
  (state: CurrentUserState) =>  state.user
);
