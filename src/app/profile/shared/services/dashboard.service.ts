import { Injectable } from '@angular/core';
import { Resolver } from '@angular/core/testing/src/resolvers';
import { UserService } from '../../../core/services/user.service';
import {filter, map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {LoadUser} from '../../../root-store/currentUser/current-user.actions';
import {selectLoadingCurrentUser} from '../../../root-store/currentUser/current-user.selectors';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements Resolver<any> {

  constructor(private userService: UserService, private store: Store<any>) { }

  resolve() {
    this.store.dispatch(new LoadUser());
    return this.store.select(selectLoadingCurrentUser)
      .pipe(
        filter((data) => !data.loading),
        take(1),
        map((data) => data.user)
      );
  }
}
