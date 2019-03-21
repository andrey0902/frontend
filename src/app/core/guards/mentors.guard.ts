import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../root-store/currentUser/current-user.selectors';
import {filter, map} from 'rxjs/operators';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MentorsGuard implements CanActivate {

  constructor(
    private store: Store<any>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(selectCurrentUser)
      .pipe(
        filter(user => user !== null),
        map((user: User) => {
          return this.checkRole(user);
        }));
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
