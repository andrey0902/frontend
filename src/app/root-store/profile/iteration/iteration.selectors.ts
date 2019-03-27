import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProfileState} from '../profile.reducer';

export const IterationFeatureSelector = createFeatureSelector('profile');

export const selectIteration = createSelector(
  IterationFeatureSelector,
  (state: ProfileState) => state.iteration.iteration
);
