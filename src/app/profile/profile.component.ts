import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../core/services/user.service';
import {User} from '../models/user.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {combineLatest, Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../root-store/currentUser/current-user.selectors';
import {CurrentIterationService} from './services/iteration.service';

@Component({
  selector: 'lt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private currentIterationService: CurrentIterationService,
    private cd: ChangeDetectorRef,
    private store: Store<any>
  ) {
  }

  user$: Observable<User>;
  currentUser$: Observable<User>;
  objectValues = Object.values;
  showRequestButtons = false;
  showIterationBtn = false;

  ngOnInit() {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.user$ = this.route.paramMap.pipe(
      tap(() => this.resetRequestButtons()),
      switchMap((params: ParamMap) => {
        return combineLatest(
          this.getSelectedUser(params.get('id')),
          this.currentUser$
        ).pipe(
          tap(([selectedUser, currentUser]) => this.showButtons(selectedUser, currentUser)),
          map(([selectedUser]) => selectedUser)
        );
      })
    );

    if (this.currentIterationService.isNew) {
      const routeId: number = +this.route.snapshot.paramMap.get('id');
      this.currentIterationService.getIteration(routeId).subscribe();
    }
  }

  public deleteIteration(userId: number): void {
    this.currentIterationService.deleteIteration(userId).subscribe();
  }

  private resetRequestButtons() {
    this.showRequestButtons = false;
    this.showIterationBtn = false;
  }

  private getSelectedUser(userId) {
    return this.userService.getUser(userId, {include: 'proteges,mentor'}).pipe(
      map((res: any) => new User(res))
    );
  }

  private showButtons(selectedUser, currentUser) {
    if (selectedUser.id === currentUser.id) {
      this.showRequestButtons = true;
    }
    if (selectedUser.attributes.mentor && selectedUser.attributes.mentor.id === currentUser.id) {
      this.showIterationBtn = true;
    }
  }

}
