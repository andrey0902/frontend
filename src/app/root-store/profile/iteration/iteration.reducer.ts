import {Iteration} from '../../../models/iteration.model';
import {IterationActionTypes, IterationActionUnion} from './iteration.actions';


export interface IterationState {
  iteration: Iteration;
  loading: boolean;
  error: any;
}

const initialState: IterationState = {
  iteration: null,
  loading: false,
  error: null
};

export function iterationReducer(state = initialState, action: IterationActionUnion): IterationState {
  switch (action.type) {
    case IterationActionTypes.GET_ITERATION_REQUEST:
    case IterationActionTypes.CREATE_ITERATION_REQUEST:
    case IterationActionTypes.DELETE_ITERATION_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true
      };
    }

    case IterationActionTypes.GET_ITERATION_SUCCESS:
    case IterationActionTypes.CREATE_ITERATION_SUCCESS: {
      return {
        ...state,
        iteration: action.payload.iteration,
        loading: false
      };
    }
    case IterationActionTypes.DELETE_ITERATION_SUCCESS: {
      return {
        ...state,
        iteration: null,
        loading: false
      };
    }

    case IterationActionTypes.GET_ITERATION_FAIL: {
      return {
        ...state,
        iteration: null,
        error: action.payload.error,
        loading: false
      };
    }
    case IterationActionTypes.CREATE_ITERATION_FAIL:
    case IterationActionTypes.DELETE_ITERATION_FAIL: {
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
