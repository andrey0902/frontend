import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProfileState} from '../profile.reducer';
import {IterationTaskModel} from '../../../personal-plan/shared/models/iteration-plan.model';

export const PlanFeatureSelector = createFeatureSelector('profile');

export const newPlan = createSelector(
  PlanFeatureSelector,
  (state: ProfileState) => {
    return Object.values(state.plan.planDictionary || {}).map((task: IterationTaskModel) => new IterationTaskModel(task));
  }
);

let oldPlan: IterationTaskModel[] = [];

export const planWithNewTask = createSelector(
  PlanFeatureSelector,
  (state: ProfileState) => {
    const newplan: IterationTaskModel[] = Object.values(state.plan.planDictionary || {}).map((task: IterationTaskModel) => new IterationTaskModel(task));
    const result = newplan.length > oldPlan.length ? newplan : null;
    oldPlan = [...newplan];
    return result;
  }
);
