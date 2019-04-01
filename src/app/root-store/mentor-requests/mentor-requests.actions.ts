import {Action} from '@ngrx/store';
import {MentorRequestMap} from '../../models/mentor-request';

export enum MentorRequestsActionTypes {
  LOAD_REQUESTS = '[Mentor Requests] Load Requests',
  LOAD_REQUESTS_SUCCESS = '[Mentor Requests] Load Requests Success',
  MAKE_MENTOR = '[Mentor Requests] Make Mentor',
  DELETE_MENTOR_REQUEST = '[Mentor Requests] Delete Mentor Request',
  CLEAR_MENTOR_REQUEST = '[Mentor Requests] Clear Mentor Request',
  DISPATCH_MENTOR_REQUESTS_FAIL = '[Mentor Requests] Dispatch Mentor Requests Fail'
}

export class LoadMentorRequests implements Action {
  readonly type = MentorRequestsActionTypes.LOAD_REQUESTS;
}

export class LoadMentorRequestsSuccess implements Action {
  readonly type = MentorRequestsActionTypes.LOAD_REQUESTS_SUCCESS;

  constructor(public payload: MentorRequestMap) {
  }
}

export class MakeMentor implements Action {
  readonly type = MentorRequestsActionTypes.MAKE_MENTOR;

  constructor(public payload: { requestId: string, userId: string }) {
  }
}

export class DeleteMentorRequest implements Action {
  readonly type = MentorRequestsActionTypes.DELETE_MENTOR_REQUEST;

  constructor(public payload: string) {
  }
}

export class ClearMentorRequest implements Action {
  readonly type = MentorRequestsActionTypes.CLEAR_MENTOR_REQUEST;

  constructor(public payload: string) {
  }
}

export class DispatchMentorRequestsFail implements Action {
  readonly type = MentorRequestsActionTypes.DISPATCH_MENTOR_REQUESTS_FAIL;

  constructor(public payload: any) {
  }
}


export type MentorRequestsActionUnion =
  | LoadMentorRequests
  | LoadMentorRequestsSuccess
  | MakeMentor
  | DeleteMentorRequest
  | ClearMentorRequest
  | DispatchMentorRequestsFail;
