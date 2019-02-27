import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MentorsState} from './mentors.reducer';

export const MentorsFeatureSelector = createFeatureSelector('mentors');

export const selectMentors = createSelector(
  MentorsFeatureSelector,
  (state: MentorsState) => state.mentors
);
