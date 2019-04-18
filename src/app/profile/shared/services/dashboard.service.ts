import { Injectable } from '@angular/core';
import { Resolver } from '@angular/core/testing/src/resolvers';
import {filter, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {LoadUser} from '../../../root-store/currentUser/current-user.actions';
import {selectCurrentUser, selectLoadingCurrentUser} from '../../../root-store/currentUser/current-user.selectors';
import {switchMap} from 'rxjs/internal/operators/switchMap';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements Resolver<any> {

  constructor(private store: Store<any>) { }

  resolve() {
    this.store.dispatch(new LoadUser());
    return this.store.select(selectLoadingCurrentUser)
      .pipe(
        filter((loading) => !loading),
        switchMap( () => this.store.select(selectCurrentUser)),
        take(1)
      );
  }
}
