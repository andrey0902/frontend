import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from './user.reducer';


export const UserFeatureSelector = createFeatureSelector('user');

export const user = createSelector(
  UserFeatureSelector,
  (state: UserState) => state.user
);
