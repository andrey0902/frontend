import {Action} from '@ngrx/store';
import {User} from '../../models/user.model';

export enum CurrentUserActionTypes {
  LOAD_USER = '[Current User] Load User',
  LOAD_USER_SUCCESS = '[Current User] Load User Success',
  LOAD_USER_FAIL = '[Current User] Load User Fail',
  WANTTOBE_MENTOR_REQUEST = '[Current User] Want to be Mentor Request',
  WANTTOBE_MENTOR_SUCCESS = '[Current User] Want to be Mentor Success',
  WANTTOBE_MENTOR_FAIL = '[Current User] Want to be Mentor Fail',
  NEED_MENTOR_REQUEST = '[Current User] Need Mentor Request',
  NEED_MENTOR_SUCCESS = '[Current User] Need Mentor Success',
  NEED_MENTOR_FAIL = '[Current User] Need Mentor Fail'
}

export class LoadUser implements Action {
  readonly type = CurrentUserActionTypes.LOAD_USER;
}

export class LoadUserSuccess implements Action {
  readonly type = CurrentUserActionTypes.LOAD_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class LoadUserFail implements Action {
  readonly type = CurrentUserActionTypes.LOAD_USER_FAIL;

  constructor(public payload: Error) {}
}

export class WantToBeMentorRequest implements Action {
  readonly type = CurrentUserActionTypes.WANTTOBE_MENTOR_REQUEST;

  constructor(public payload: {userId: string, reason: string}) {}
}

export class WantToBeMentorSuccess implements Action {
  readonly type = CurrentUserActionTypes.WANTTOBE_MENTOR_SUCCESS;
}

export class WantToBeMentorFail implements Action {
  readonly type = CurrentUserActionTypes.WANTTOBE_MENTOR_FAIL;

  constructor(public payload: Error) {}
}

export class NeedMentorRequest implements Action {
  readonly type = CurrentUserActionTypes.NEED_MENTOR_REQUEST;

  constructor(public payload: {userId: string, reason: string}) {}
}

export class NeedMentorSuccess implements Action {
  readonly type = CurrentUserActionTypes.NEED_MENTOR_SUCCESS;
}

export class NeedMentorFail implements Action {
  readonly type = CurrentUserActionTypes.NEED_MENTOR_FAIL;

  constructor(public payload: Error) {}
}

export type CurrentUserActionUnion =
  | LoadUser
  | LoadUserSuccess
  | LoadUserFail
  | WantToBeMentorRequest
  | WantToBeMentorSuccess
  | WantToBeMentorFail
  | NeedMentorRequest
  | NeedMentorSuccess
  | NeedMentorFail;
