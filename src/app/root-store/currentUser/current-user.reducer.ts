import {User} from '../../models/user.model';
import {CurrentUserActionTypes, CurrentUserActionUnion} from './current-user.actions';

export interface CurrentUserState {
  user: User;
  loading: boolean;
  error: any;
}

const initialState: CurrentUserState = {
  user: null,
  loading: false,
  error: null
};

export function currentUserReducer(state = initialState, action: CurrentUserActionUnion): CurrentUserState {
  switch (action.type) {

    case CurrentUserActionTypes.LOAD_USER:
    case CurrentUserActionTypes.WANTTOBE_MENTOR_REQUEST:
    case CurrentUserActionTypes.NEED_MENTOR_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case CurrentUserActionTypes.LOAD_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }

    case CurrentUserActionTypes.WANTTOBE_MENTOR_SUCCESS: {
      return {
        ...state,
        user: state.user.patch({wantBeMentor: true}),
        loading: false,
      };
    }

    case CurrentUserActionTypes.NEED_MENTOR_SUCCESS: {
      return {
        ...state,
        user: state.user.patch({needMentor: true}),
        loading: false,
      };
    }

    case CurrentUserActionTypes.LOAD_USER_FAIL:
    case CurrentUserActionTypes.WANTTOBE_MENTOR_FAIL:
    case CurrentUserActionTypes.NEED_MENTOR_FAIL: {
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
