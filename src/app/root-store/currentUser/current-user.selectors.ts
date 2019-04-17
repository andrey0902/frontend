import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CurrentUserState} from './current-user.reducer';

export const CurrentUserFeatureSelector = createFeatureSelector('currentUser');

export const selectCurrentUser = createSelector(
  CurrentUserFeatureSelector,
  (state: CurrentUserState) => state.user
);

export const selectLoadingCurrentUser = createSelector(
  CurrentUserFeatureSelector,
  (state: CurrentUserState) => {
    return {
      loading: state.loading,
      user: state.user
    };
  }
);
