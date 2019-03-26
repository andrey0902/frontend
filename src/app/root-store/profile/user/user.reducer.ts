import {User} from '../../../models/user.model';
import {UserActionTypes, UserActionUnion} from './user.actions';

export interface UserState {
  user: User;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

export function userReducer(state = initialState, action: UserActionUnion): UserState {
  switch (action.type) {
    case UserActionTypes.GET_USER_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true
      };
    }

    case UserActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        loading: false
      };
    }

    case UserActionTypes.GET_USER_FAIL: {
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
