import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../../core/services/user.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {CurrentUserActionTypes, LoadUser, LoadUserFail, LoadUserSuccess} from './current-user.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {User} from '../../models/user.model';

@Injectable()
export class CurrentUserEffectService {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect() getUsers: Observable<Action> = this.actions$.pipe(
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
}
