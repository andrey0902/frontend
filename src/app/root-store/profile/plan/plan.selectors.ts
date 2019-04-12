import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProfileState} from '../profile.reducer';
import {IterationTaskModel} from '../../../personal-plan/shared/models/iteration-plan.model';

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
    return {
      loading: state.plan.loading,
      plan : Object.values(state.plan.planDictionary || {}).map((task: IterationTaskModel) => new IterationTaskModel(task))
    };
  }
);

export const errorPlan = createSelector(
  PlanFeatureSelector,
  (state: ProfileState) => {
    return {
      error: state.plan.error ? state.plan.error.message : '',
      plan : Object.values(state.plan.planDictionary || {}).map((task: IterationTaskModel) => new IterationTaskModel(task))
    };
  }
);
