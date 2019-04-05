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

let oldPlan: IterationTaskModel[] = [];

export const planWithNewTask = createSelector(
  PlanFeatureSelector,
  (state: ProfileState) => {
    const newPlan: IterationTaskModel[] = Object.values(state.plan.planDictionary || {}).map((task: IterationTaskModel) => new IterationTaskModel(task));
    const result = newPlan.length > oldPlan.length ? newPlan : null;
    oldPlan = [...newPlan];
    return result;
  }
);
