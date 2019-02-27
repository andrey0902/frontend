import {User} from '../../models/user.model';
import {UsersActionTypes, UsersActionUnion} from './users.actions';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: any;
}

const initialState: UsersState = {
  users: null,
  loading: false,
  error: null
};

export function usersReducer(state = initialState, action: UsersActionUnion): UsersState {
  switch (action.type) {

    case UsersActionTypes.LOAD_USERS: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case UsersActionTypes.LOAD_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    }

    case UsersActionTypes.LOAD_USERS_FAIL: {
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
