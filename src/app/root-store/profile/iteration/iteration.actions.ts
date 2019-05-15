import {Action} from '@ngrx/store';

export interface IIterationPayload {
  iteration?: any;
  userId?: number;
  reason?: string;
  error?: Error;
}

export enum IterationActionTypes {
  GET_ITERATION_REQUEST = '[Iteration] Get Iteration Request',
  GET_ITERATION_SUCCESS = '[Iteration] Get Iteration Success',
  GET_ITERATION_FAIL = '[Iteration] Get Iteration Fail',
  CREATE_ITERATION_REQUEST = '[Iteration] Create Iteration Request',
  CREATE_ITERATION_SUCCESS = '[Iteration] Create Iteration Success',
  CREATE_ITERATION_FAIL = '[Iteration] Create Iteration Fail',
  DELETE_ITERATION_REQUEST = '[Iteration] Delete Iteration Request',
  DELETE_ITERATION_SUCCESS = '[Iteration] Delete Iteration Success',
  DELETE_ITERATION_FAIL = '[Iteration] Delete Iteration Fail'
}


// Get iteration from the server and add into the store
export class GetIterationRequest implements Action {
  readonly type = IterationActionTypes.GET_ITERATION_REQUEST;

  constructor(public payload: IIterationPayload) {}
}

export class GetIterationSuccess implements Action {
  readonly type = IterationActionTypes.GET_ITERATION_SUCCESS;

  constructor(public payload: IIterationPayload) {}
}

export class GetIterationFail implements Action {
  readonly type = IterationActionTypes.GET_ITERATION_FAIL;

  constructor(public payload: IIterationPayload) {}
}

// Create iteration on the server and add into the store
export class CreateIterationRequest implements Action {
  readonly type = IterationActionTypes.CREATE_ITERATION_REQUEST;

  constructor(public payload: IIterationPayload) {}
}

export class CreateIterationSuccess implements Action {
  readonly type = IterationActionTypes.CREATE_ITERATION_SUCCESS;

  constructor(public payload: IIterationPayload) {}
}

export class CreateIterationFail implements Action {
  readonly type = IterationActionTypes.CREATE_ITERATION_FAIL;

  constructor(public payload: IIterationPayload) {}
}

// Clear value of iteration in the store after deleting it on the server
export class DeleteIterationRequest implements Action {
  readonly type = IterationActionTypes.DELETE_ITERATION_REQUEST;

  constructor(public payload: IIterationPayload) {}
}

export class DeleteIterationSuccess implements Action {
  readonly type = IterationActionTypes.DELETE_ITERATION_SUCCESS;

  constructor(public payload: IIterationPayload = {}) {}
}

export class DeleteIterationFail implements Action {
  readonly type = IterationActionTypes.DELETE_ITERATION_FAIL;

  constructor(public payload: IIterationPayload) {}
}

// export
export type IterationActionUnion =
  | GetIterationRequest
  | GetIterationSuccess
  | GetIterationFail
  | CreateIterationRequest
  | CreateIterationSuccess
  | CreateIterationFail
  | DeleteIterationRequest
  | DeleteIterationSuccess
  | DeleteIterationFail;
