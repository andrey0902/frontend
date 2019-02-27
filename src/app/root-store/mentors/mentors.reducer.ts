import {User} from '../../models/user.model';
import {MentorsActionTypes, MentorsActionUnion} from './mentors.actions';

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

    default: {
      return state;
    }
  }
}
