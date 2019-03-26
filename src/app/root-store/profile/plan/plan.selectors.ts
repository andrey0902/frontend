import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PlanState} from './plan.reducer';

export const PlanFeatureSelector = createFeatureSelector('plan');

export const plan = createSelector(
  PlanFeatureSelector,
  (state: PlanState) => state.plan
);
