import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {combineLatest, Observable, of, zip} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../root-store/currentUser/current-user.selectors';
import {User} from '../../models/user.model';
import {catchError, map, switchMap} from 'rxjs/operators';
import {UserService} from '../../core/services/user.service';
import {IterationService} from '../../core/services/iteration.service';
import {CurrentIterationService} from './iteration.service';
import {Iteration} from '../../models/iteration.model';
import {tap} from 'rxjs/internal/operators/tap';

@Injectable()
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
        if (!this.currentIterationService.isNew && this.currentIterationService.isExist) {
          this.router.navigate(['/profile', protegeId]);
        }

        if (!this.currentIterationService.isNew && !this.currentIterationService.isExist) {
          return of(true);
        }

        if (this.currentIterationService.isNew && selectedUser.attributes.mentor && selectedUser.attributes.mentor.id === currentUser.id) {
          return this.getCurrentIteration(protegeId);
        }

        return of(false);
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
      map(() => {
        this.router.navigate(['/profile', protegeId]);
        return false;
      })
    );
  }
}
