import {Action} from '@ngrx/store';
import {User, UsersMap} from '../../models/user.model';
import { MentorProtegeId } from '../../summary-mentors/shared/models/mentor-protege-id.model';
import { ProtegeIteration } from '../../summary-mentors/shared/models/protege-iteration.model';

export enum MentorsActionTypes {
  LOAD_MENTORS = '[Mentors] Load Mentors',
  LOAD_MENTORS_SUCCESS = '[Mentors] Load Mentors Success',
  ADD_MENTOR = '[Mentors] Add Mentor',
  ADD_MENTOR_SUCCESS = '[Mentors] Add Mentor Success',
  DELETE_MENTOR = '[Mentors] Delete Mentor',
  DELETE_MENTOR_SUCCESS = '[Mentors] Delete Mentor Success',
  ADD_PROTEGE = '[Mentors] Add Protege',
  ADD_PROTEGE_SUCCESS = '[Mentors] Add Protege Success',
  CHANGE_MENTOR = '[Mentors] Change Mentor',
  CHANGE_MENTOR_SUCCESS = '[Mentors] Change Mentor Success',
  DELETE_PROTEGE = '[Mentors] Delete Protege',
  DELETE_PROTEGE_SUCCESS = '[Mentors] Delete Protege Success',
  DISPATCH_MENTORS_FAIL = '[Mentors] Dispatch Mentors Fail',

  LOAD_PROTEGE_ITERATION = '[Mentors] Load Protege Iteration',
  LOAD_PROTEGE_ITERATION_SUCCESS = '[Mentors] Load Protege Iteration Success',
  LOAD_PROTEGE_ITERATION_FAIL = '[Mentors] Load Protege Iteration Fail',
}

export class LoadProtegeIteration implements Action {
  readonly type = MentorsActionTypes.LOAD_PROTEGE_ITERATION;
  constructor(public payload: MentorProtegeId) {}
}

export class LoadProtegeIterationSuccess implements Action {
  readonly type = MentorsActionTypes.LOAD_PROTEGE_ITERATION_SUCCESS;

  constructor(public payload: ProtegeIteration) {
  }
}

export class LoadMentors implements Action {
  readonly type = MentorsActionTypes.LOAD_MENTORS;
}

export class LoadMentorsSuccess implements Action {
  readonly type = MentorsActionTypes.LOAD_MENTORS_SUCCESS;

  constructor(public payload: UsersMap) {
  }
}

export class AddMentor implements Action {
  readonly type = MentorsActionTypes.ADD_MENTOR;

  constructor(public payload: string | number) {
  }
}

export class AddMentorSuccess implements Action {
  readonly type = MentorsActionTypes.ADD_MENTOR_SUCCESS;

  constructor(public payload: UsersMap) {
  }
}

export class AddProtege implements Action {
  readonly type = MentorsActionTypes.ADD_PROTEGE;

  constructor(public payload: { protegeId: number, mentorId: number }) {
  }
}

export class AddProtegeSuccess implements Action {
  readonly type = MentorsActionTypes.ADD_PROTEGE_SUCCESS;

  constructor(public payload: { protege: User, mentorId: number }) {
  }
}

export class DeleteMentor implements Action {
  readonly type = MentorsActionTypes.DELETE_MENTOR;

  constructor(public payload: number) {
  }
}

export class DeleteMentorSuccess implements Action {
  readonly type = MentorsActionTypes.DELETE_MENTOR_SUCCESS;

  constructor(public payload: number) {
  }
}

export class ChangeMentor implements Action {
  readonly type = MentorsActionTypes.CHANGE_MENTOR;

  constructor(public payload: { protegeId: number, mentorId: number , currentMentorId: number }) {
  }
}

export class ChangeMentorSuccess implements Action {
  readonly type = MentorsActionTypes.CHANGE_MENTOR_SUCCESS;

  constructor(public payload: { protege: User, newMentorId: number , currentMentorId: number }) {
  }
}

export class DeleteProtege implements Action {
  readonly type = MentorsActionTypes.DELETE_PROTEGE;

  constructor(public payload: { protegeId: number, mentorId: number, currentMentorId: number }) {
  }
}

export class DeleteProtegeSuccess implements Action {
  readonly type = MentorsActionTypes.DELETE_PROTEGE_SUCCESS;

  constructor(public payload: { protegeId: number, currentMentorId: number }) {
  }
}

export class DispatchMentorsFail implements Action {
  readonly type = MentorsActionTypes.DISPATCH_MENTORS_FAIL;

  constructor(public payload: any) {
  }
}

export type MentorsActionUnion =
  | LoadMentors
  | LoadMentorsSuccess
  | AddMentor
  | AddMentorSuccess
  | DeleteMentor
  | DeleteMentorSuccess
  | AddProtege
  | AddProtegeSuccess
  | ChangeMentor
  | ChangeMentorSuccess
  | DeleteProtege
  | DeleteProtegeSuccess
  | DispatchMentorsFail
  | LoadProtegeIteration
  | LoadProtegeIterationSuccess;
