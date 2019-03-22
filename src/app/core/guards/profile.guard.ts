import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../root-store/currentUser/current-user.selectors';
import { filter, map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(private store: Store<any>) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectCurrentUser)
      .pipe(
        filter(user => user !== null),
        map((user: User) => {

          const paramsId = next.params.id;
          const isAdmin = this.checkIsAdmin(user);
          const currentUser = this.checkUserId(user, paramsId);
          const isMentor = this.checkIsMentor(user, paramsId);

          if (isAdmin || currentUser || isMentor) {
            return true;
          } else {
            const portalId = user.attributes.mentor ? user.attributes.mentor.attributes.portalId : user.attributes.portalId;
            window.location.href = `${environment.redirectProfile}${portalId}`;
            return false;
          }

        })
      );
  }

  checkIsAdmin(user): boolean {
    return user.attributes.roles.some((role) => role.toLocaleLowerCase() === 'admin');
  }

  checkUserId(user: User, id): boolean {
    return user.id === id;
  }

  checkIsMentor(user: User, id): boolean {
    return !!user.attributes.proteges[id];
  }
}
