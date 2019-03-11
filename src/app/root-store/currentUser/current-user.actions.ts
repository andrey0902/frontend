import {Action} from '@ngrx/store';
import {User} from '../../models/user.model';

export enum CurrentUserActionTypes {
  LOAD_USER = '[Current User] Load User',
  LOAD_USER_SUCCESS = '[Current User] Load User Success',
  LOAD_USER_FAIL = '[Current User] Load User Fail',
}

export class LoadUser implements Action {
  readonly type = CurrentUserActionTypes.LOAD_USER;

  constructor(public payload: string | number) {}
}

export class LoadUserSuccess implements Action {
  readonly type = CurrentUserActionTypes.LOAD_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class LoadUserFail implements Action {
  readonly type = CurrentUserActionTypes.LOAD_USER_FAIL;

  constructor(public payload: any) {}
}

export type CurrentUserActionUnion =
  | LoadUser
  | LoadUserSuccess
  | LoadUserFail;
