import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MentorsState} from './mentors.reducer';

export const MentorsFeatureSelector = createFeatureSelector('mentors');

export const sortByLastName = (a: any, b: any) => a.attributes.lastName > b.attributes.lastName ? 1 : -1;

export const selectMentors = createSelector(
  MentorsFeatureSelector,
  (state: MentorsState) => {
    const mentors = state.mentors;
    return Object.values(mentors)
      .sort(sortByLastName);
  }
);

export const selectMentorsLoad = createSelector(
  MentorsFeatureSelector,
  (state: MentorsState) => {
    return state.loading;
  }
);
