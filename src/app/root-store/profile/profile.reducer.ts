import {iterationReducer, IterationState} from './iteration/iteration.reducer';
import {planReducer, PlanState} from './plan/plan.reducer';
import {userReducer, UserState} from './user/user.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface ProfileState {
  iteration: IterationState;
  plan: PlanState;
  user: UserState;
}

export const profileReducers: ActionReducerMap<ProfileState> = {
  iteration: iterationReducer,
  plan: planReducer,
  user: userReducer
};
