import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {combineLatest, Observable, of, zip} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../root-store/currentUser/current-user.selectors';
import {User} from '../../models/user.model';
import {catchError, map, switchMap} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {CurrentIterationService} from '../../profile/services/iteration.service';


@Injectable({
  providedIn: 'root'
})
export class CreateIterationGuard implements CanActivate {

  constructor(
    private store: Store<any>,
    private userService: UserService,
    private currentIterationService: CurrentIterationService,
    private router: Router,
  ) {
  }

  currentUser$: Observable<User> = this.store.select(selectCurrentUser);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const protegeId = route.paramMap.get('id');
    return combineLatest(
      this.getSelectedUser(protegeId),
      this.currentUser$
    ).pipe(
      switchMap(([selectedUser, currentUser]) => {
        if (this.currentIterationService.isExist) {
          this.router.navigate(['/profile', protegeId]);
          return of(false);
        }

        if (this.currentIterationService.userId !== undefined && !this.currentIterationService.isExist) {
          return of(true);
        }

        return this.getCurrentIteration(protegeId);
      })
    );
  }

  private getSelectedUser(protegeId) {
    return this.userService.getUser(protegeId, {include: 'mentor'}).pipe(
      map((res: any) => new User(res))
    );
  }

  private getCurrentIteration(protegeId) {
    return this.currentIterationService.getIteration(protegeId).pipe(
      switchMap(() => {
        this.router.navigate(['/profile', protegeId]);
        return of(false);
      }),
      catchError(() => of(true))
    );
  }
}
