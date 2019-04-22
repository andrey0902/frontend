import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../../core/services/user.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {CurrentUserActionTypes, LoadUserFail, LoadUserSuccess, NeedMentorFail, NeedMentorSuccess, WantToBeMentorFail, WantToBeMentorSuccess} from './current-user.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {User} from '../../models/user.model';

@Injectable()
export class CurrentUserEffectService {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect() getCurrentUser: Observable<Action> = this.actions$.pipe(
    ofType(CurrentUserActionTypes.LOAD_USER),
    switchMap(() => {
      return this.userService.getCurrentUser().pipe(
        map((res: any) => {
          const user = new User(res);
          return new LoadUserSuccess(user);
        }),
        catchError(err => {
          return of(new LoadUserFail(err.error ? err.error.errors : null));
        })
      );
    })
  );

  @Effect() wantToBeMentor: Observable<Action> = this.actions$.pipe(
    ofType(CurrentUserActionTypes.WANTTOBE_MENTOR_REQUEST),
    switchMap((action: any) => {
      return this.userService.createMentorRequest(action.payload.userId, action.payload.reason)
      .pipe(
        map(() => new WantToBeMentorSuccess()),
        catchError(err => {
          return of(new  WantToBeMentorFail(err.error.error));
        })
      );
    })
  );

  @Effect() needMentor: Observable<Action> = this.actions$.pipe(
    ofType(CurrentUserActionTypes.NEED_MENTOR_REQUEST),
    switchMap((action: any) => {
      return this.userService.createProtegeRequest(action.payload.userId, action.payload.reason)
        .pipe(
          map(() => new NeedMentorSuccess()),
          catchError(err => {
            return of(new  NeedMentorFail(err.error.error));
          })
        );
    })
  );
}
