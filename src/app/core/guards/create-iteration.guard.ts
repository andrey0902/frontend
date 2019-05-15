import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../root-store/currentUser/current-user.selectors';
import {User} from '../../models/user.model';
import {filter, map, switchMap} from 'rxjs/operators';
import {selectUser} from '../../root-store/profile/user/user.selectors';
import {Iteration} from '../../models/iteration.model';
import {selectIteration} from '../../root-store/profile/iteration/iteration.selectors';
import {GetUserRequest} from '../../root-store/profile/user/user.actions';
import {GetIterationRequest} from '../../root-store/profile/iteration/iteration.actions';


@Injectable({
  providedIn: 'root'
})
export class CreateIterationGuard implements CanActivate {

  constructor(
    private store: Store<any>,
    private router: Router
  ) {}

  currentUser$: Observable<User> = this.store.select(selectCurrentUser);
  selectedUser$: Observable<User> = this.store.select(selectUser);
  currentIteration$: Observable<Iteration> = this.store.select(selectIteration);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const selectedUserId: number = +route.paramMap.get('id');

    return combineLatest(
      this.currentUser$,
      this.selectedUser$,
      this.currentIteration$
    ).pipe(
      switchMap(([currentUser, selectedUser, currentIteration]) => {
        if (currentIteration) {
          this.router.navigate(['/profile', selectedUserId]);
          return of(false);
        }

        if (currentUser && selectedUser) {
          return of(this.checkIsMentor(selectedUser, currentUser));
        } else {
          this.store.dispatch(new GetUserRequest({userId: selectedUserId}));
          this.store.dispatch(new GetIterationRequest({userId: selectedUserId}));

          return combineLatest(
            this.currentUser$,
            this.selectedUser$
          ).pipe(
            filter(([curUser, selUser]) => !!curUser && !!selUser),
            map(([curUser, selUser]) => {
              return this.checkIsMentor(selUser, curUser);
            })
          );
        }
      })
    );
  }

  checkIsMentor(selectedUser, currentUser) {
    if (selectedUser.attributes.mentor && selectedUser.attributes.mentor.id === currentUser.id) {
      return true;
    } else {
      this.router.navigate(['/profile', selectedUser.id]);
      return false;
    }
  }
}
