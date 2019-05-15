import {UsersMap } from '../../models/user.model';
import {MentorsActionTypes, MentorsActionUnion} from './mentors.actions';
import {MentorsHelper} from './mentors.helper';

export interface MentorsState {
  mentors: UsersMap ;
  loading: boolean;
  error: any;
}

const initialState: MentorsState = {
  mentors: {},
  loading: false,
  error: null
};

export function mentorsReducer(state = initialState, action: MentorsActionUnion): MentorsState {
  switch (action.type) {

    case MentorsActionTypes.LOAD_PROTEGE_ITERATION_SUCCESS: {
      const {mentorId, protegeId, iteration} = action.payload;
      const { mentors } = state;

      mentors[mentorId].attributes.proteges[protegeId].iteration = iteration;

      return {
          ...state,
          mentors
        };
    }

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

    case MentorsActionTypes.ADD_MENTOR_SUCCESS: {
      return {
        ...state,
        error: null,
        mentors: {
          ...action.payload,
          ...state.mentors,
        }
      };
    }

    case MentorsActionTypes.DELETE_MENTOR_SUCCESS: {
      return {
        ...state,
        mentors: { ...MentorsHelper.deleteMentor(state.mentors, action.payload) },
        error: null,
      };
    }

    case MentorsActionTypes.ADD_PROTEGE_SUCCESS: {
      return {
        ...state,
        mentors: { ...MentorsHelper.addProtege(state.mentors, action.payload.protege, action.payload.mentorId) },
        error: null,
      };
    }

    case MentorsActionTypes.CHANGE_MENTOR_SUCCESS: {
      return {
        ...state,
        mentors: { ...MentorsHelper.changeMentor(state.mentors, action.payload.protege, action.payload.newMentorId, action.payload.currentMentorId) },
        error: null,
      };
    }

    case MentorsActionTypes.DELETE_PROTEGE_SUCCESS: {
      return {
        ...state,
        mentors: { ...MentorsHelper.deleteProtege(state.mentors, action.payload.protegeId, action.payload.currentMentorId) },
        error: null,
      };
    }

    case MentorsActionTypes.DISPATCH_MENTORS_FAIL: {
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
