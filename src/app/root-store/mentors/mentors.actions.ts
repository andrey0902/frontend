import {Action} from '@ngrx/store';
import {User} from '../../models/user.model';

export enum MentorsActionTypes {
  LOAD_MENTORS = '[Mentors] Load Mentors',
  LOAD_MENTORS_SUCCESS = '[Mentors] Load Mentors Success',
  LOAD_MENTORS_FAIL = '[Mentors] Load Mentors Fail',
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

export type MentorsActionUnion =
  | LoadMentors
  | LoadMentorsSuccess
  | LoadMentorsFail;
