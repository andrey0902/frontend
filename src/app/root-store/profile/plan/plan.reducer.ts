import {IterationTaskModel} from '../../../personal-plan/shared/models/iteration-plan.model';
import {PlanActionTypes, PlanActionUnion} from './plan.actions';

export interface PlanState {
  plan: IterationTaskModel[];
  loading: boolean;
  error: any;
}

const initialState: PlanState = {
  plan: null,
  loading: false,
  error: null
};

export function planReducer(state = initialState, action: PlanActionUnion): PlanState {
  switch (action.type) {
    case PlanActionTypes.GET_PLAN_REQUEST:
    case PlanActionTypes.CREATE_PLAN_TASK_REQUEST:
    case PlanActionTypes.EDIT_PLAN_TASK_REQUEST:
    case PlanActionTypes.DELETE_PLAN_TASK_REQUEST:
    case PlanActionTypes.UPDATE_PLAN_TASKS_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true
      };
    }

    case PlanActionTypes.GET_PLAN_SUCCESS: {
      return {
        ...state,
        plan: action.payload.plan,
        loading: false
      };
    }

    case PlanActionTypes.CREATE_PLAN_TASK_SUCCESS: {
      return {
        ...state,
        plan: [...state.plan, action.payload.task],
        loading: false
      };
    }

    case PlanActionTypes.EDIT_PLAN_TASK_SUCCESS: {
      return {
        ...state,
        plan: state.plan.map((task) => task.id === action.payload.taskId ? action.payload.task : task),
        loading: false
      };
    }

    case PlanActionTypes.DELETE_PLAN_TASK_SUCCESS: {
      return {
        ...state,
        plan: state.plan.filter((task) => task.id !== action.payload.taskId),
        loading: false
      };
    }

    case PlanActionTypes.UPDATE_PLAN_TASKS_SUCCESS: {
      return {
        ...state,
        plan: state.plan.map((task) => {
          task.isStatus = action.payload.tasksId.includes(task.id) ? task.isStatus = action.payload.status : task.isStatus;
          return task;
        }),
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
