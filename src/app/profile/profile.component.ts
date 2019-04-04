import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {filter, map, switchMap, takeWhile, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../root-store/currentUser/current-user.selectors';
import {PatchUser} from '../root-store/currentUser/current-user.actions';
import {UserService} from '../core/services/user.service';
import {DialogService} from '../shared/dialog/services/dialog.service';
import {GetUserRequest} from '../root-store/profile/user/user.actions';
import {selectUser} from '../root-store/profile/user/user.selectors';
import {selectIteration} from '../root-store/profile/iteration/iteration.selectors';
import {Iteration} from '../models/iteration.model';
import {DeleteIterationRequest, GetIterationRequest} from '../root-store/profile/iteration/iteration.actions';

export type Rights = 'mentor' | 'current' | 'alien';

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
    private dialogService: DialogService,
    private cd: ChangeDetectorRef
  ) {
  }

  user: User;
  iterationExists: Iteration;
  currentUser$: Observable<User>;
  selectedUser$: Observable<User>;
  currentIteration$: Observable<Iteration>;
  objectValues = Object.values;
  showRequestButtons = false;
  showIterationBtn = false;
  componentActive = true;
  userRights: Rights = 'alien';
  isAdmin = false;

  ngOnInit(): void {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.selectedUser$ = this.store.select(selectUser);
    this.currentIteration$ = this.store.select(selectIteration);

    this.currentIteration$.pipe(
      takeWhile(() => this.componentActive)
    ).subscribe((iteration) => {
      this.iterationExists = iteration;
      this.cd.detectChanges();
    });

    this.route.paramMap.pipe(
      takeWhile(() => this.componentActive),
    ).subscribe(params => {
      const userId = params.get('id');
      this.store.dispatch(new GetIterationRequest({userId}));
    });

    this.checkUserExist();
  }

  public deleteIteration(userId: string): void {
    this.dialogService.openDeleteIterationDialog(request => {
      if (request) {
        this.store.dispatch(new DeleteIterationRequest({
          userId,
          iteration: this.iterationExists,
          reason: request
        }));
      }
    });
  }

  public wantBeMentor(): void {
    this.dialogService.openRequestDialog('Примечание', (text) => {
      if (text !== null && text !== undefined) {
        this.route.paramMap.pipe(
          takeWhile(() => this.componentActive),
          switchMap((params: ParamMap) => this.userService.createMentorRequest(params.get('id'), text)),
        ).subscribe(() => {
          this.store.select(selectCurrentUser).pipe(
            takeWhile(() => this.componentActive)
          ).subscribe((data: User) => this.user = data);
          this.store.dispatch(new PatchUser({wantBeMentor: true}));
        });
      }
    });
  }

  public needMentor(): void {
    this.dialogService.openRequestDialog('Примечание', (text) => {
      if (text !== null && text !== undefined) {
        this.route.paramMap.pipe(
          takeWhile(() => this.componentActive),
          switchMap((params: ParamMap) => this.userService.createProtegeRequest(params.get('id'), text))
        ).subscribe(() => {
          this.store.select(selectCurrentUser).pipe(
            takeWhile(() => this.componentActive)
          ).subscribe((data: User) => this.user = data);
          this.store.dispatch(new PatchUser({needMentor: true}));
        });
      }
    });
  }

  private checkUserExist() {
    combineLatest(this.selectedUser$, this.route.paramMap, this.currentUser$).pipe(
      takeWhile(() => this.componentActive),
      tap(() => this.resetRequestButtons()),
      switchMap(([user, routeParams, currentUser]) => {
        const userId = routeParams.get('id');
        if (!user || this.checkUserId(user, userId)) {
          return this.initUser(userId);
        } else {
          this.showButtons(user, currentUser);
          return of(user);
        }
      })
    ).subscribe(user => {
      this.user = user;
      this.cd.detectChanges();
    });
  }

  private initUser(id) {
    this.store.dispatch(new GetUserRequest({userId: id}));

    return combineLatest(
      this.selectedUser$.pipe(filter(user => !!user)),
      this.currentUser$
    ).pipe(
      tap(([selectedUser, currentUser]) => this.showButtons(selectedUser, currentUser)),
      map(([selectedUser]) => selectedUser)
    );
  }

  private checkUserId(user: User, id: string): boolean {
    return user.id !== id;
  }

  private resetRequestButtons() {
    this.showRequestButtons = false;
    this.showIterationBtn = false;
  }

  private showButtons(selectedUser, currentUser) {
    if (currentUser.attributes.roles.includes('admin')) {
      this.isAdmin = true;
    }

    if (selectedUser.id === currentUser.id) {
      this.showRequestButtons = true;
      this.userRights = 'current';
      return;
    }
    if (selectedUser.attributes.mentor && selectedUser.attributes.mentor.id === currentUser.id) {
      this.showIterationBtn = true;
      this.userRights = 'mentor';
      return;
    }
    this.showRequestButtons = false;
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
