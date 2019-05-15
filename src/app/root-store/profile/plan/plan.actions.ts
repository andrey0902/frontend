import {Action} from '@ngrx/store';
import {IterationTaskModel} from '../../../models/iteration-plan.model';

export interface IPlanPayload {
  iterationId?: number;
  userId?: number;
  taskId?: number;
  tasksId?: number[];
  tasks?: IterationTaskModel[];
  task?: IterationTaskModel;
  error?: Error;
}

export enum PlanActionTypes {
  GET_PLAN_REQUEST = '[Plan] Get Plan Request',
  GET_PLAN_SUCCESS = '[Plan] Get Plan Success',
  GET_PLAN_FAIL = '[Plan] Get Plan Fail',
  CREATE_PLAN_TASK_REQUEST = '[Plan] Create Plan Task Request',
  CREATE_PLAN_TASK_SUCCESS = '[Plan] Create Plan Task Success',
  CREATE_PLAN_TASK_FAIL = '[Plan] Create Plan Task Fail',
  EDIT_PLAN_TASK_REQUEST = '[Plan] Edit Plan Task Request',
  EDIT_PLAN_TASK_SUCCESS = '[Plan] Edit Plan Task Success',
  EDIT_PLAN_TASK_FAIL = '[Plan] Edit Plan Task Fail',
  DELETE_PLAN_TASK_REQUEST = '[Plan] Delete Plan task Request',
  DELETE_PLAN_TASK_SUCCESS = '[Plan] Delete Plan Task Success',
  DELETE_PLAN_TASK_FAIL = '[Plan] Delete Plan Task Fail',
  UPDATE_PLAN_TASKS_REQUEST = '[Plan] Update Plan Tasks Request',
  UPDATE_PLAN_TASKS_SUCCESS = '[Plan] Update Plan Tasks Success',
  UPDATE_PLAN_TASKS_FAIL = '[Plan] Update Plan Tasks Fail'
}


// add a plan from the server and add into the store
export class GetPlanRequest implements Action {
  readonly type = PlanActionTypes.GET_PLAN_REQUEST;

  constructor(public payload: IPlanPayload) {}
}

export class GetPlanSuccess implements Action {
  readonly type = PlanActionTypes.GET_PLAN_SUCCESS;

  constructor(public payload: IPlanPayload) {}
}

export class GetPlanFail implements Action {
  readonly type = PlanActionTypes.GET_PLAN_FAIL;

  constructor(public payload: IPlanPayload) {}
}

// create an task of plan on the server and update plan in the store

export class CreatePlanTaskRequest implements Action {
  readonly type = PlanActionTypes.CREATE_PLAN_TASK_REQUEST;

  constructor(public payload: IPlanPayload) {}
}

export class CreatePlanTaskSuccess implements Action {
  readonly type = PlanActionTypes.CREATE_PLAN_TASK_SUCCESS;

  constructor(public payload: IPlanPayload) {}
}

export class CreatePlanTaskFail implements Action {
  readonly type = PlanActionTypes.CREATE_PLAN_TASK_FAIL;

  constructor(public payload: IPlanPayload) {}
}

// edit an task of plan on the server and update plan in the store

export class EditPlanTaskRequest implements Action {
  readonly type = PlanActionTypes.EDIT_PLAN_TASK_REQUEST;

  constructor(public payload: IPlanPayload) {}
}

export class EditPlanTaskSuccess implements Action {
  readonly type = PlanActionTypes.EDIT_PLAN_TASK_SUCCESS;

  constructor(public payload: IPlanPayload) {}
}

export class EditPlanTaskFail implements Action {
  readonly type = PlanActionTypes.EDIT_PLAN_TASK_FAIL;

  constructor(public payload: IPlanPayload) {}
}

// delete an task of plan on the server and update plan in the store

export class DeletePlanTaskRequest implements Action {
  readonly type = PlanActionTypes.DELETE_PLAN_TASK_REQUEST;

  constructor(public payload: IPlanPayload) {}
}

export class DeletePlanTaskSuccess implements Action {
  readonly type = PlanActionTypes.DELETE_PLAN_TASK_SUCCESS;

  constructor(public payload: IPlanPayload) {}
}

export class DeletePlanTaskFail implements Action {
  readonly type = PlanActionTypes.DELETE_PLAN_TASK_FAIL;

  constructor(public payload: IPlanPayload) {}
}

// update status of several tasks of plan on the server and update plan in the store

export class UpdatePlanTasksRequest implements Action {
  readonly type = PlanActionTypes.UPDATE_PLAN_TASKS_REQUEST;

  constructor(public payload: IPlanPayload) {}
}

export class UpdatePlanTasksSuccess implements Action {
  readonly type = PlanActionTypes.UPDATE_PLAN_TASKS_SUCCESS;

  constructor(public payload: IPlanPayload) {}
}

export class UpdatePlanTasksFail implements Action {
  readonly type = PlanActionTypes.UPDATE_PLAN_TASKS_FAIL;

  constructor(public payload: IPlanPayload) {}
}

// export
export type PlanActionUnion =
  | GetPlanRequest
  | GetPlanSuccess
  | GetPlanFail
  | CreatePlanTaskRequest
  | CreatePlanTaskSuccess
  | CreatePlanTaskFail
  | EditPlanTaskRequest
  | EditPlanTaskSuccess
  | EditPlanTaskFail
  | DeletePlanTaskRequest
  | DeletePlanTaskSuccess
  | DeletePlanTaskFail
  | UpdatePlanTasksRequest
  | UpdatePlanTasksSuccess
  | UpdatePlanTasksFail;
