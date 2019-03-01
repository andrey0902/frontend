import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../../core/services/user.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {UsersActionTypes, LoadUsersSuccess, LoadUsersFail} from './users.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {User} from '../../models/user.model';

@Injectable()
export class UsersEffectService {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect() getUsers: Observable<Action> = this.actions$.pipe(
    ofType(UsersActionTypes.LOAD_USERS),
    switchMap(() => {
      return this.userService.getUsers().pipe(
        map((users: User[]) => {
          return new LoadUsersSuccess(users);
        }),
        catchError(err => of(new LoadUsersFail(err)))
      );
    })
  );
}