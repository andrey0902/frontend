import {Action} from '@ngrx/store';
import {User} from '../../models/user.model';

export enum MentorsActionTypes {
  LOAD_MENTORS = '[Mentors] Load Mentors',
  LOAD_MENTORS_SUCCESS = '[Mentors] Load Mentors Success',
  LOAD_MENTORS_FAIL = '[Mentors] Load Mentors Fail',
  ADD_MENTOR = '[Mentors] Add Mentor',
  ADD_MENTOR_SUCCESS = '[Mentors] Add Mentor Success',
  ADD_MENTOR_FAIL = '[Mentors] Add Mentor Fail',
  DELETE_MENTOR = '[Mentors] Delete Mentor',
  DELETE_MENTOR_SUCCESS = '[Mentors] Delete Mentor Success',
  DELETE_MENTOR_FAIL = '[Mentors] Delete Mentor Fail',
  UPDATE_RELATIONS = '[Mentors] Update Relations',
  UPDATE_RELATIONS_FAIL = '[Mentors] Update Relations Fail'
}

export class LoadMentors implements Action {
  readonly type = MentorsActionTypes.LOAD_MENTORS;
}

export class LoadMentorsSuccess implements Action {
  readonly type = MentorsActionTypes.LOAD_MENTORS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class LoadMentorsFail implements Action {
  readonly type = MentorsActionTypes.LOAD_MENTORS_FAIL;

  constructor(public payload: any) {
  }
}

export class AddMentor implements Action {
  readonly type = MentorsActionTypes.ADD_MENTOR;

  constructor(public payload: string | number) {
  }
}

export class AddMentorSuccess implements Action {
  readonly type = MentorsActionTypes.ADD_MENTOR_SUCCESS;

  constructor(public payload: User) {
  }
}

export class AddMentorFail implements Action {
  readonly type = MentorsActionTypes.ADD_MENTOR_FAIL;

  constructor(public payload: any) {
  }
}

export class DeleteMentor implements Action {
  readonly type = MentorsActionTypes.DELETE_MENTOR;

  constructor(public payload: string | number) {
  }
}

export class DeleteMentorSuccess implements Action {
  readonly type = MentorsActionTypes.DELETE_MENTOR_SUCCESS;

  constructor(public payload: string | number) {
  }
}

export class DeleteMentorFail implements Action {
  readonly type = MentorsActionTypes.DELETE_MENTOR_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateRelations implements Action {
  readonly type = MentorsActionTypes.UPDATE_RELATIONS;

  constructor(public payload: { protegeId: string | number, mentorId: string | number }) {
  }
}

export class UpdateRelationsFail implements Action {
  readonly type = MentorsActionTypes.UPDATE_RELATIONS_FAIL;

  constructor(public payload: any) {
  }
}

export type MentorsActionUnion =
  | LoadMentors
  | LoadMentorsSuccess
  | LoadMentorsFail
  | AddMentor
  | AddMentorSuccess
  | AddMentorFail
  | DeleteMentor
  | DeleteMentorSuccess
  | DeleteMentorFail
  | UpdateRelations
  | UpdateRelationsFail;
