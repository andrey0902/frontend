import {Component, OnInit} from '@angular/core';
import {UserService} from '../core/services/user.service';
import {User} from '../models/user.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../root-store/currentUser/current-user.selectors';
import {IterationService} from '../core/services/iteration.service';

@Component({
  selector: 'lt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private iterationService: IterationService,
    private store: Store<any>
  ) { }

  user$: Observable<User>;
  currentUser$: Observable<User>;
  currentIteration$: Observable<any>;
  objectValues = Object.values;
  showRequestButtons = false;
  showIterationBtn = false;
  iterationExists = false;

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

    this.currentIteration$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.iterationService.getCurrentIteration(params.get('id')).pipe(
          tap(() => this.iterationExists = true),
          tap(() => this.iterationExists = true),
          catchError(err => {
            if (err.error.error.code === 404) {
              this.iterationExists = false;
              return of(null);
            }
          })
        );
      })
    );

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
