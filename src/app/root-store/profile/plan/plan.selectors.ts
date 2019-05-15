import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProfileState} from '../profile.reducer';
import {IterationTaskModel} from '../../../models/iteration-plan.model';

export const PlanFeatureSelector = createFeatureSelector('profile');

export const plan = createSelector(
  PlanFeatureSelector,
  (state: ProfileState) => {
    return Object.values(state.plan.planDictionary || {}).map((task: IterationTaskModel) => new IterationTaskModel(task));
  }
);

export const loadingPlan = createSelector(
  PlanFeatureSelector,
  (state: ProfileState) => {
    return state.plan.loading;
  }
);

export const errorPlan = createSelector(
  PlanFeatureSelector,
  (state: ProfileState) => {
    return state.plan.error;
  }
);

export const loadingPlanTask = createSelector(
  PlanFeatureSelector,
  (state: ProfileState) => {
    return state.plan.loadingNewTask;
  }
);
