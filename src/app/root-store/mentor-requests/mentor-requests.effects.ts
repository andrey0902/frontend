import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../../core/services/user.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  ClearMentorRequest, DeleteMentorRequest,
  DispatchMentorRequestsFail,
  LoadMentorRequestsSuccess, MakeMentor,
  MentorRequestsActionTypes
} from './mentor-requests.actions';
import {MentorRequestsHelper} from './mentor-requests.helper';

@Injectable() export class MentorRequestsEffectService {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect() getMentorRequests: Observable<Action> = this.actions$.pipe(
    ofType(MentorRequestsActionTypes.LOAD_REQUESTS),
    switchMap(() => {
      return this.userService.getBecomeMentorUsers().pipe(
        map((res: any[]) => {
          const requestList = MentorRequestsHelper.createRequestMap(res);
          return new LoadMentorRequestsSuccess(requestList);
        }),
        catchError(err => of(new DispatchMentorRequestsFail(err.error.errors)))
      );
    })
  );

  @Effect() makeMentor: Observable<Action> = this.actions$.pipe(
    ofType(MentorRequestsActionTypes.MAKE_MENTOR),
    switchMap((action: MakeMentor) => {
      return this.userService.addMentor(action.payload.userId).pipe(
        map(() => {
          return new ClearMentorRequest(action.payload.requestId);
        }),
        catchError(err => of(new DispatchMentorRequestsFail(err.error.errors)))
      );
    })
  );

  @Effect() deleteMentorRequest: Observable<Action> = this.actions$.pipe(
    ofType(MentorRequestsActionTypes.DELETE_MENTOR_REQUEST),
    switchMap((action: DeleteMentorRequest) => {
      return this.userService.deleteMentorRequest(action.payload).pipe(
        map(() => {
          return new ClearMentorRequest(action.payload);
        }),
        catchError(err => of(new DispatchMentorRequestsFail(err.error.errors)))
      );
    })
  );

}
