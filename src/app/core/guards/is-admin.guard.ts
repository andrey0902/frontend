import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {selectCurrentUser} from '../../root-store/currentUser/current-user.selectors';
import {Store} from '@ngrx/store';
import {filter, map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanLoad {

  constructor(
    private store: Store<any>,
    private router: Router
  ) {}

  currentUser$: Observable<User> = this.store.select(selectCurrentUser);

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.currentUser$.pipe(
      filter(user => !!user),
      take(1),
      map((user: User) => {
        return this.checkRole(user);
      })
    );
  }

  checkRole(data: User) {
    if (data && data.attributes.roles) {
      const isAdmin = data.attributes.roles.some((item: string) => item.includes('admin'));
      if (!isAdmin) {
        this.router.navigate(['/profile', data.id]);
        return false;
      }
      return true;
    }
    return false;
  }
}
