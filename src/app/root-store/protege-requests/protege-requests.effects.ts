import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../../core/services/user.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  AssignMentor, ClearProtegeRequest, DeleteProtegeRequest,
  DispatchProtegeRequestsFail,
  LoadProtegeRequestsSuccess,
  ProtegeRequestsActionTypes
} from './protege-requests.actions';
import {MentorRequestsHelper} from '../mentor-requests/mentor-requests.helper';

@Injectable() export class ProtegeRequestsEffectService {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect() getProtegeRequests: Observable<Action> = this.actions$.pipe(
    ofType(ProtegeRequestsActionTypes.LOAD_REQUESTS),
    switchMap(() => {
      return this.userService.getNeedMentorRequests().pipe(
        map((res: any[]) => {
          const requestList = MentorRequestsHelper.createRequestMap(res);
          return new LoadProtegeRequestsSuccess(requestList);
        }),
        catchError(err => of(new DispatchProtegeRequestsFail(err.error.errors)))
      );
    })
  );

  @Effect() assignMentor: Observable<Action> = this.actions$.pipe(
    ofType(ProtegeRequestsActionTypes.ASSIGN_MENTOR),
    switchMap((action: AssignMentor) => {
      return this.userService.bindProtegeToMentor(action.payload).pipe(
        map(() => {
          return new ClearProtegeRequest(action.payload.requestId);
        }),
        catchError(err => of(new DispatchProtegeRequestsFail(err.error.errors)))
      );
    })
  );

  @Effect() deleteProtegeRequest: Observable<Action> = this.actions$.pipe(
    ofType(ProtegeRequestsActionTypes.DELETE_PROTEGE_REQUEST),
    switchMap((action: DeleteProtegeRequest) => {
      return this.userService.deleteProtegeRequest(action.payload).pipe(
        map(() => {
          return new ClearProtegeRequest(action.payload);
        }),
        catchError(err => of(new DispatchProtegeRequestsFail(err.error.errors)))
      );
    })
  );

}
