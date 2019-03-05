import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProtegeRequestsState} from './protege-requests.reducer';

export const ProtegeRequestsFeatureSelector = createFeatureSelector('protegeRequests');

export const selectProtegeRequests = createSelector(
  ProtegeRequestsFeatureSelector,
  (state: ProtegeRequestsState) => state.requests
);
