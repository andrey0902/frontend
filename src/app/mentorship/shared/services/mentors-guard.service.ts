import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../root-store/currentUser/current-user.selectors';
import { map } from 'rxjs/operators';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MentorsGuard implements CanActivate {

  constructor(private store: Store<any>) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(selectCurrentUser)
      .pipe(
        map((user: User) => {
          return this.checkRole(user.attributes.roles);
    }));
  }

  checkRole(data: string[]) {
    if (data) {
      return data.some((item: string) => item.includes('admin'));
    }
    return false;
  }
}
