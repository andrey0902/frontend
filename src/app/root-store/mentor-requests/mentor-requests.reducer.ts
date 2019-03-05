import {MentorRequestsActionTypes, MentorRequestsActionUnion} from './mentor-requests.actions';
import {MentorRequestMap} from '../../models/mentor-request';
import {MentorRequestsHelper} from './mentor-requests.helper';

export interface MentorRequestsState {
  requests: MentorRequestMap;
  loading: boolean;
  error: any;
}

const initialState: MentorRequestsState = {
  requests: {},
  loading: false,
  error: null
};

export function mentorRequestsReducer(state = initialState, action: MentorRequestsActionUnion): MentorRequestsState {
  switch (action.type) {

    case MentorRequestsActionTypes.LOAD_REQUESTS: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case MentorRequestsActionTypes.LOAD_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: action.payload,
        loading: false,
      };
    }

    case MentorRequestsActionTypes.CLEAR_MENTOR_REQUEST: {
      return {
        ...state,
        requests: { ...MentorRequestsHelper.deleteRequest(state.requests, action.payload) }
      };
    }

    case MentorRequestsActionTypes.DISPATCH_MENTOR_REQUESTS_FAIL: {
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
