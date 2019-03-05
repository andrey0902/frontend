import {ProtegeRequestsActionTypes, ProtegeRequestsActionUnion} from './protege-requests.actions';
import {MentorRequestMap} from '../../models/mentor-request';
import {MentorRequestsHelper} from '../mentor-requests/mentor-requests.helper';

export interface ProtegeRequestsState {
  requests: MentorRequestMap;
  loading: boolean;
  error: any;
}

const initialState: ProtegeRequestsState = {
  requests: {},
  loading: false,
  error: null
};

export function protegeRequestsReducer(state = initialState, action: ProtegeRequestsActionUnion): ProtegeRequestsState {
  switch (action.type) {

    case ProtegeRequestsActionTypes.LOAD_REQUESTS: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case ProtegeRequestsActionTypes.LOAD_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: action.payload,
        loading: false,
      };
    }

    case ProtegeRequestsActionTypes.CLEAR_PROTEGE_REQUEST: {
      return {
        ...state,
        requests: { ...MentorRequestsHelper.deleteRequest(state.requests, action.payload) }
      };
    }

    case ProtegeRequestsActionTypes.DISPATCH_PROTEGE_REQUESTS_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}
