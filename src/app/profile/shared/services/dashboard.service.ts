import { Injectable } from '@angular/core';
import { Resolver } from '@angular/core/testing/src/resolvers';
import { UserService } from '../../../core/services/user.service';
import { map } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { LoadUserSuccess } from '../../../root-store/currentUser/current-user.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements Resolver<any> {

  constructor(private userService: UserService,
              private store: Store<any>) { }

  resolve() {
    return this.userService.getCurrentUser()
      .pipe(map((response: any) => {
        const user = new User(response);
        // this.store.dispatch(new LoadUserSuccess(user));
        // return new LoadUserSuccess(user);
        return user;
      }));
  }
}
