import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProfileState} from '../profile.reducer';
import {IterationTaskModel} from '../../../personal-plan/shared/models/iteration-plan.model';
import {PlanDictionary} from './plan.reducer';

export const PlanFeatureSelector = createFeatureSelector('profile');

export const plan = createSelector(
  PlanFeatureSelector,
  (state: ProfileState) => {
    const newPlan: PlanDictionary = Object.assign({}, state.plan.planDictionary);
    return Object.values(newPlan).map((task: IterationTaskModel) => new IterationTaskModel(task));
  }
);
