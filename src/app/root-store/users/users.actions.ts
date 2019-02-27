import {Action} from '@ngrx/store';
import {User} from '../../models/user.model';

export enum UsersActionTypes {
  LOAD_USERS = '[Users] Load Users',
  LOAD_USERS_SUCCESS = '[Users] Load Users Success',
  LOAD_USERS_FAIL = '[Users] Load Users Fail',
}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
  readonly type = UsersActionTypes.LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class LoadUsersFail implements Action {
  readonly type = UsersActionTypes.LOAD_USERS_FAIL;

  constructor(public payload: any) {
  }
}

export type UsersActionUnion =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail;
