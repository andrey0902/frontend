import {Injectable} from '@angular/core';

import {UserService} from '../../../core/services/user.service';
import {Observable} from 'rxjs';
import {GetUserFail, GetUserSuccess, UserActionTypes, UserActionUnion} from './user.actions';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {catchError, map} from 'rxjs/operators';
import {User} from '../../../models/user.model';
import {of} from 'rxjs/internal/observable/of';
import {Actions, Effect, ofType} from '@ngrx/effects';


@Injectable()
export class UserEffectsService {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
  }

  @Effect() getUser: Observable<UserActionUnion> = this.actions$.pipe(
    ofType(UserActionTypes.GET_USER_REQUEST),
    switchMap((action: UserActionUnion) => {
      return this.userService.getUser(action.payload.userId, {include: 'proteges,mentor'})
        .pipe(
          map(data => {
            const user = new User(data);
            return new GetUserSuccess({user: user});
          }),
          catchError(err => of(new GetUserFail({error: err.error.errors})))
        );
    })
  );
}
