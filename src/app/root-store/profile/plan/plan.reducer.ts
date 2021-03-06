import {IterationTaskModel} from '../../../models/iteration-plan.model';
import {PlanActionTypes, PlanActionUnion} from './plan.actions';

export type PlanDictionary = { [id: number]: IterationTaskModel };

export interface PlanState {
  planDictionary: PlanDictionary;
  loading: boolean;
  loadingNewTask: boolean;
  error: any;
}

const initialState: PlanState = {
  planDictionary: null,
  loading: false,
  loadingNewTask: false,
  error: null
};

export function planReducer(state = initialState, action: PlanActionUnion): PlanState {
  switch (action.type) {
    case PlanActionTypes.GET_PLAN_REQUEST:
    case PlanActionTypes.EDIT_PLAN_TASK_REQUEST:
    case PlanActionTypes.DELETE_PLAN_TASK_REQUEST:
    case PlanActionTypes.UPDATE_PLAN_TASKS_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true
      };
    }

    case PlanActionTypes.CREATE_PLAN_TASK_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
        loadingNewTask: true
      };
    }

    case PlanActionTypes.GET_PLAN_SUCCESS:
    case PlanActionTypes.EDIT_PLAN_TASK_SUCCESS: {
      const newPlan: PlanDictionary = {};
      action.payload.tasks.forEach((task: IterationTaskModel) => newPlan[task.id] = task);
      return {
        ...state,
        planDictionary: newPlan,
        loading: false
      };
    }

    case PlanActionTypes.CREATE_PLAN_TASK_SUCCESS: {
      const newPlan: PlanDictionary = {};
      action.payload.tasks.forEach((task: IterationTaskModel) => newPlan[task.id] = task);
      return {
        ...state,
        planDictionary: newPlan,
        loading: false,
        loadingNewTask: false
      };
    }

    case PlanActionTypes.DELETE_PLAN_TASK_SUCCESS: {
      const newPlan: PlanDictionary = Object.assign({}, state.planDictionary);
      action.payload.tasksId.forEach((taskId: number) => delete newPlan[taskId]);
      return {
        ...state,
        planDictionary: newPlan,
        loading: false
      };
    }

    case PlanActionTypes.UPDATE_PLAN_TASKS_SUCCESS: {
      const newPlan: PlanDictionary = Object.assign({}, state.planDictionary);
      action.payload.tasks.forEach((task: IterationTaskModel) => newPlan[task.id].is_completed = task.is_completed);
      return {
        ...state,
        planDictionary: newPlan,
        loading: false
      };
    }

    case PlanActionTypes.GET_PLAN_FAIL:
    case PlanActionTypes.CREATE_PLAN_TASK_FAIL:
    case PlanActionTypes.EDIT_PLAN_TASK_FAIL:
    case PlanActionTypes.DELETE_PLAN_TASK_FAIL:
    case PlanActionTypes.UPDATE_PLAN_TASKS_FAIL: {
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    }

    default: {
      return state;
    }
  }
}
