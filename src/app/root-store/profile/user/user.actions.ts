import {Action} from '@ngrx/store';
import {User} from '../../../models/user.model';

export interface IUserPayload {
  userId?: number;
  user?: User;
  error?: Error;
}

export enum UserActionTypes {
  GET_USER_REQUEST = '[User] Get User Request',
  GET_USER_SUCCESS = '[User] Get User Success',
  GET_USER_FAIL = '[User] Get User Fail'
}

export class GetUserRequest implements Action {
  readonly type = UserActionTypes.GET_USER_REQUEST;

  constructor(public payload: IUserPayload) {}
}

export class GetUserSuccess implements Action {
  readonly type = UserActionTypes.GET_USER_SUCCESS;

  constructor(public payload: IUserPayload) {}
}

export class GetUserFail implements Action {
  readonly type = UserActionTypes.GET_USER_FAIL;

  constructor(public payload: IUserPayload) {}
}

export type UserActionUnion =
  | GetUserRequest
  | GetUserSuccess
  | GetUserFail;
