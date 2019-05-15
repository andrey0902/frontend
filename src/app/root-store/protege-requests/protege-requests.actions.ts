import {Action} from '@ngrx/store';
import {MentorRequestMap} from '../../models/mentor-request';

export enum ProtegeRequestsActionTypes {
  LOAD_REQUESTS = '[Protege Requests] Load Requests',
  LOAD_REQUESTS_SUCCESS = '[Protege Requests] Load Requests Success',
  ASSIGN_MENTOR = '[Protege Requests] Assign Mentor',
  DELETE_PROTEGE_REQUEST = '[Protege Requests] Delete Protege Request',
  CLEAR_PROTEGE_REQUEST = '[Protege Requests] Clear Protege Request',
  DISPATCH_PROTEGE_REQUESTS_FAIL = '[Protege Requests] Dispatch Protege Requests Fail'
}

export class LoadProtegeRequests implements Action {
  readonly type = ProtegeRequestsActionTypes.LOAD_REQUESTS;
}

export class LoadProtegeRequestsSuccess implements Action {
  readonly type = ProtegeRequestsActionTypes.LOAD_REQUESTS_SUCCESS;

  constructor(public payload: MentorRequestMap) {
  }
}

export class AssignMentor implements Action {
  readonly type = ProtegeRequestsActionTypes.ASSIGN_MENTOR;

  constructor(public payload: { protegeId: number, mentorId: number, requestId: number }) {
  }
}

export class DeleteProtegeRequest implements Action {
  readonly type = ProtegeRequestsActionTypes.DELETE_PROTEGE_REQUEST;

  constructor(public payload: number) {
  }
}

export class ClearProtegeRequest implements Action {
  readonly type = ProtegeRequestsActionTypes.CLEAR_PROTEGE_REQUEST;

  constructor(public payload: number) {
  }
}

export class DispatchProtegeRequestsFail implements Action {
  readonly type = ProtegeRequestsActionTypes.DISPATCH_PROTEGE_REQUESTS_FAIL;

  constructor(public payload: any) {
  }
}


export type ProtegeRequestsActionUnion =
  | LoadProtegeRequests
  | LoadProtegeRequestsSuccess
  | AssignMentor
  | DeleteProtegeRequest
  | ClearProtegeRequest
  | DispatchProtegeRequestsFail;
