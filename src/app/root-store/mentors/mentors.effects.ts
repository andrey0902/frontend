import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../../core/services/user.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {
  AddMentor,
  AddMentorSuccess, AddProtege, AddProtegeSuccess, ChangeMentor, ChangeMentorSuccess,
  DeleteMentor, DeleteMentorSuccess, DeleteProtege, DeleteProtegeSuccess, DispatchMentorsFail,
  LoadMentorsSuccess,
  MentorsActionTypes
} from './mentors.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {User, UsersMap} from '../../models/user.model';
import {MentorsHelper} from './mentors.helper';

@Injectable() export class MentorsEffectService {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect() getMentors: Observable<Action> = this.actions$.pipe(
    ofType(MentorsActionTypes.LOAD_MENTORS),
    switchMap(() => {
        return this.userService.getMentors({include: 'proteges,iteration', sort: `last_name`}).pipe(
          map((mentors: any[]) => {
            const mentorList = MentorsHelper.createUsersMap(mentors);
            return new LoadMentorsSuccess(mentorList);
          }),
          catchError(err => {
            return this.handlerError(err);
          })
      );
    })
  );

  @Effect() addMentor: Observable<Action> = this.actions$.pipe(
    ofType(MentorsActionTypes.ADD_MENTOR),
    switchMap((action: AddMentor) => {
      return this.userService.addMentor(action.payload, { include: 'proteges' }).pipe(
        map((res: any) => {
          const mentor: UsersMap = { [res.id]: new User(res)};
          return new AddMentorSuccess(mentor);
        }),
        catchError(err => {
          return this.handlerError(err);
        })
      );
    })
  );

  @Effect() deleteMentor: Observable<Action> = this.actions$.pipe(
    ofType(MentorsActionTypes.DELETE_MENTOR),
    switchMap((action: DeleteMentor) => {
      return this.userService.deleteMentor(action.payload).pipe(
        map((res: any) => {
          return new DeleteMentorSuccess(res.id);
        }),
        catchError(err => {
          return this.handlerError(err);
        })
      );
    })
  );

  @Effect() addProtege: Observable<Action> = this.actions$.pipe(
    ofType(MentorsActionTypes.ADD_PROTEGE),
    switchMap((action: AddProtege) => {
      return this.userService.bindProtegeToMentor(action.payload).pipe(
        map((res: any) => {
          return new AddProtegeSuccess({
            protege: new User(res),
            mentorId: action.payload.mentorId
          });
        }),
        catchError(err => {
          return this.handlerError(err);
        })
      );
    })
  );

  @Effect() changeMentor: Observable<Action> = this.actions$.pipe(
    ofType(MentorsActionTypes.CHANGE_MENTOR),
    switchMap((action: ChangeMentor) => {
      return this.userService.bindProtegeToMentor(action.payload).pipe(
        map((res: any) => {
          return new ChangeMentorSuccess({
            protege: new User(res),
            newMentorId: action.payload.mentorId,
            currentMentorId: action.payload.currentMentorId
          });
        }),
        catchError(err => {
          return this.handlerError(err);
        })
      );
    })
  );

  @Effect() deleteProtege: Observable<Action> = this.actions$.pipe(
    ofType(MentorsActionTypes.DELETE_PROTEGE),
    switchMap((action: DeleteProtege) => {
      return this.userService.bindProtegeToMentor(action.payload).pipe(
        map((res: any) => {
          return new DeleteProtegeSuccess({
            protegeId: res.id,
            currentMentorId: action.payload.currentMentorId
          });
        }),
        catchError(err => {
          return this.handlerError(err);
        })
      );
    })
  );

  private handlerError(err: any): Observable<any> {
    return of(new DispatchMentorsFail(err.error ? err.error.errors : null));
  }
}
