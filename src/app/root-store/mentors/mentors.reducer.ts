import {User} from '../../models/user.model';
import {MentorsActionTypes, MentorsActionUnion} from './mentors.actions';
import {MentorHelper} from './mentor.helper';

export interface MentorsState {
  mentors: User[];
  loading: boolean;
  error: any;
}

const initialState: MentorsState = {
  mentors: null,
  loading: false,
  error: null
};

export function mentorsReducer(state = initialState, action: MentorsActionUnion): MentorsState {
  switch (action.type) {

    case MentorsActionTypes.LOAD_MENTORS: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case MentorsActionTypes.LOAD_MENTORS_SUCCESS: {
      return {
        ...state,
        mentors: action.payload,
        loading: false,
      };
    }

    case MentorsActionTypes.LOAD_MENTORS_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    case MentorsActionTypes.ADD_MENTOR_SUCCESS: {
      return {
        ...state,
        error: null,
        mentors: [
          action.payload,
          ...state.mentors,
        ]
      };
    }

    case MentorsActionTypes.ADD_MENTOR_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    case MentorsActionTypes.DELETE_MENTOR_SUCCESS: {
      return {
        ...state,
        mentors: MentorHelper.deleteMentor(state.mentors, action.payload),
        error: null,
      };
    }

    case MentorsActionTypes.DELETE_MENTOR_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    case MentorsActionTypes.UPDATE_RELATIONS_FAIL: {
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
