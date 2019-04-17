import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {filter, map, switchMap, take, takeWhile, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../root-store/currentUser/current-user.selectors';
import {NeedMentorRequest, WantToBeMentorRequest} from '../root-store/currentUser/current-user.actions';
import {UserService} from '../core/services/user.service';
import {DialogService} from '../shared/dialog/services/dialog.service';
import {GetUserRequest, GetUserSuccess} from '../root-store/profile/user/user.actions';
import {selectUser} from '../root-store/profile/user/user.selectors';
import {selectIteration} from '../root-store/profile/iteration/iteration.selectors';
import {Iteration} from '../models/iteration.model';
import {DeleteIterationRequest, GetIterationRequest} from '../root-store/profile/iteration/iteration.actions';

export type Rights = 'mentor' | 'current' | 'read';

@Component({
  selector: 'lt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private store: Store<any>,
    private dialogService: DialogService
  ) {
  }

  USERRIGHTS: { [id: string]: Rights } = {
    MENTOR: 'mentor',
    CURRENT: 'current',
    READ: 'read'
  };

  user: User;
  userId: string;
  iteration: Iteration;
  userRights: Rights = this.USERRIGHTS.READ;
  isAdmin: boolean = false;
  objectValues = Object.values;

  currentUser$: Observable<User>;
  selectedUser$: Observable<User>;
  currentIteration$: Observable<Iteration>;

  componentActive = true;

  ngOnInit(): void {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.selectedUser$ = this.store.select(selectUser);
    this.currentIteration$ = this.store.select(selectIteration);

    // update selected user
    this.updateSelectedUser();

    // get user and update iteration
    this.initUser()
      .pipe(
        takeWhile(() => this.componentActive),
        filter((user) => !!user)
      )
      .subscribe((user: User) => {
        this.user = user;
        this.store.dispatch(new GetIterationRequest({userId: user.id}));
      });

    // get iteration
    this.currentIteration$.pipe(
      takeWhile(() => this.componentActive)
    )
      .subscribe((iteration) => this.iteration = iteration);
  }

  // requests

  public deleteIteration(userId: string): void {
    this.dialogService.openDeleteIterationDialog(request => {
      if (request) {
        this.store.dispatch(new DeleteIterationRequest({
          userId,
          iteration: this.iteration,
          reason: request
        }));
      }
    });
  }

  public wantBeMentor(): void {
    this.dialogService.openRequestDialog('Примечание', request => {
      if (request) {
        this.store.dispatch(new WantToBeMentorRequest({userId: this.user.id, reason: request}));
      }
    });
  }

  public needMentor(): void {
    this.dialogService.openRequestDialog('Примечание', request => {
      if (request) {
        this.store.dispatch(new NeedMentorRequest({userId: this.user.id, reason: request}));
      }
    });
  }

  // initialize

  private updateSelectedUser() {
    combineLatest(this.route.paramMap, this.route.data).pipe(
      takeWhile(() => this.componentActive)
    )
      .subscribe(([routeParams, data]) => {
        const routeId = routeParams.get('id');
        const request = routeId ? new GetUserRequest({userId: routeId}) : new GetUserSuccess({user: data.user});
        this.userId = routeId || data.user.id;
        this.store.dispatch(request);
      });
  }

  private initUser(): Observable<User> {
    return combineLatest(this.selectedUser$, this.currentUser$)
      .pipe(
        takeWhile(() => this.componentActive),
        filter(([selectedUser, currentUser]) => !!selectedUser && !!currentUser && selectedUser.id === this.userId),
        take(1),
        switchMap(([selectedUser, currentUser]) => {
          this.checkUserRights(selectedUser, currentUser);
          return selectedUser.id === currentUser.id ? this.currentUser$ : this.selectedUser$;
        })
      );
  }

  private checkUserRights(selectedUser, currentUser) {

    this.isAdmin = currentUser.attributes.roles.includes('admin');

    if (selectedUser.id === currentUser.id) {
      this.userRights = this.USERRIGHTS.CURRENT;
      return;
    }

    if (selectedUser.attributes.mentor && selectedUser.attributes.mentor.id === currentUser.id) {
      this.userRights = this.USERRIGHTS.MENTOR;
      return;
    }

    this.userRights = this.USERRIGHTS.READ;
  }

  // destroy

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
