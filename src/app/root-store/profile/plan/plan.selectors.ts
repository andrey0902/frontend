import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProfileState} from '../profile.reducer';

export const PlanFeatureSelector = createFeatureSelector('profile');

export const plan = createSelector(
  PlanFeatureSelector,
  (state: ProfileState) => state.plan.plan
);
