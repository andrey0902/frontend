import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IterationState} from './iteration.reducer';

export const IterationFeatureSelector = createFeatureSelector('iteration');

export const iteration = createSelector(
  IterationFeatureSelector,
  (state: IterationState) => state.iteration
);
