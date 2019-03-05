import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MentorRequestsState} from './mentor-requests.reducer';

export const MentorRequestsFeatureSelector = createFeatureSelector('mentorRequests');

export const selectMentorRequests = createSelector(
  MentorRequestsFeatureSelector,
  (state: MentorRequestsState) => state.requests
);
