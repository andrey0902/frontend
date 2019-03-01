import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../../core/services/user.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {
  AddMentor,
  AddMentorFail,
  AddMentorSuccess,
  DeleteMentor, DeleteMentorFail, DeleteMentorSuccess, LoadMentors,
  LoadMentorsFail,
  LoadMentorsSuccess,
  MentorsActionTypes, UpdateRelations, UpdateRelationsFail
} from './mentors.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {User} from '../../models/user.model';

@Injectable() export class MentorsEffectService {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect() getMentors: Observable<Action> = this.actions$.pipe(
    ofType(MentorsActionTypes.LOAD_MENTORS),
    switchMap(() => {
      return this.userService.getMentors({include: 'proteges'}).pipe(
        map((mentors: any[]) => {
          const mentorList: User[] = mentors.map(mentor => new User(mentor));
          console.log(mentorList);
          return new LoadMentorsSuccess(mentorList);
        }),
        catchError(err => of(new LoadMentorsFail(err.error.errors)))
      );
    })
  );

  @Effect() addMentor: Observable<Action> = this.actions$.pipe(
    ofType(MentorsActionTypes.ADD_MENTOR),
    switchMap((action: AddMentor) => {
      return this.userService.addMentor(action.payload).pipe(
        map((res: any) => {
          const mentor: User = new User(res);
          return new AddMentorSuccess(mentor);
        }),
        catchError(err => of(new AddMentorFail(err.error.errors)))
      );
    })
  );

  @Effect() deleteMentor: Observable<Action> = this.actions$.pipe(
    ofType(MentorsActionTypes.DELETE_MENTOR),
    switchMap((action: DeleteMentor) => {
      return this.userService.deleteMentor(action.payload).pipe(
        map((res: any) => {
          const user: User = new User(res);
          return new DeleteMentorSuccess(user.id);
        }),
        catchError(err => of(new DeleteMentorFail(err.error.errors)))
      );
    })
  );

  @Effect() updateRelations: Observable<Action> = this.actions$.pipe(
    ofType(MentorsActionTypes.UPDATE_RELATIONS),
    switchMap((action: UpdateRelations) => {
      return this.userService.bindProtegeToMentor(action.payload).pipe(
        map(() => new LoadMentors()),
        catchError(err => of(new UpdateRelationsFail(err.error.errors)))
      );
    })
  );
}
