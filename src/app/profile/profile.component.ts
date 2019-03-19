import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {catchError, map, switchMap, takeWhile, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../root-store/currentUser/current-user.selectors';
import {IterationService} from '../core/services/iteration.service';
import {MatDialog} from '@angular/material';
import {CreateRequestDialogComponent} from './create-request-dialog/create-request-dialog.component';
import {CurrentIterationService} from './services/iteration.service';
import {UserService} from '../core/services/user.service';
import {LoadUserSuccess, PatchUser} from '../root-store/currentUser/current-user.actions';

@Component({
  selector: 'lt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private iterationService: IterationService,
    private store: Store<any>,
    private dialog: MatDialog,
    private currentIterationService: CurrentIterationService,
    private cd: ChangeDetectorRef
  ) {
  }

  user: User;
  currentUser$: Observable<User>;
  objectValues = Object.values;
  showRequestButtons = false;
  showIterationBtn = false;
  iterationExists = false;
  componentActive = true;

  ngOnInit() {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.route.paramMap.pipe(
      tap(() => this.resetRequestButtons()),
      switchMap((params: ParamMap) => {
        return combineLatest(
          this.getSelectedUser(params.get('id')),
          this.currentUser$
        ).pipe(
          tap(([selectedUser, currentUser]) => this.showButtons(selectedUser, currentUser)),
          map(([selectedUser]) => selectedUser)
        );
      }),
      takeWhile(() => this.componentActive)
    ).subscribe(res => {
      this.user = res;
    });

    if (this.currentIterationService.isNew) {
      const routeId: number = +this.route.snapshot.paramMap.get('id');
      this.currentIterationService.getIteration(routeId).subscribe();
    }
  }

  public deleteIteration(userId: number): void {
    this.currentIterationService.deleteIteration(userId).subscribe();
  }

  wantBeMentor() {
    const dialogRef = this.dialog.open(CreateRequestDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(text => {
      if (text !== null) {
        this.route.paramMap.pipe(
          switchMap((params: ParamMap) => this.userService.createMentorRequest(params.get('id'), text)),
          takeWhile(() => this.componentActive)
        ).subscribe(() => {
          this.store.select(selectCurrentUser).pipe(
            takeWhile(() => this.componentActive)
          ).subscribe((data: User) => this.user = data );
          this.store.dispatch(new PatchUser({ wantBeMentor: true }));
        });
      }
    });
  }

  needMentor() {
    const dialogRef = this.dialog.open(CreateRequestDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(text => {
      if (text !== null) {
        this.route.paramMap.pipe(
          switchMap((params: ParamMap) => this.userService.createProtegeRequest(params.get('id'), text))
        ).subscribe(() => {
          this.store.select(selectCurrentUser).pipe(
            takeWhile(() => this.componentActive)
          ).subscribe((data: User) => this.user = data );
          this.store.dispatch(new PatchUser({ needMentor: true }));
        });
      }
    });
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
      this.store.dispatch(new LoadUserSuccess(selectedUser));
    }
    if (selectedUser.attributes.mentor && selectedUser.attributes.mentor.id === currentUser.id) {
      this.showIterationBtn = true;
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
