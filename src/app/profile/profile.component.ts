import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {catchError, map, skip, switchMap, takeWhile, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../root-store/currentUser/current-user.selectors';
import {IterationService} from '../core/services/iteration.service';
import {MatDialog} from '@angular/material';
import {LoadUserSuccess, PatchUser} from '../root-store/currentUser/current-user.actions';
import {CurrentIterationService} from './services/iteration.service';
import {UserService} from '../core/services/user.service';
import {DialogService} from '../shared/dialog/services/dialog.service';

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
    private dialogService: DialogService,
    private dialog: MatDialog,
    private currentIterationService: CurrentIterationService
  ) {
  }

  user: User;
  currentUser$: Observable<User>;
  objectValues = Object.values;
  showRequestButtons = false;
  showIterationBtn = false;
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
          tap(([selectedUser, currentUser]) => {
            this.showButtons(selectedUser, currentUser);
            if (+selectedUser.id !== this.currentIterationService.userId) {
              this.currentIterationService.userId = +selectedUser.id;
            }
          }),
          map(([selectedUser]) => selectedUser),
        );
      }),
      takeWhile(() => this.componentActive)
    ).subscribe(res => {
      this.user = res;
    });


    this.currentIterationService.userIdAsObserv
      .pipe(
        skip(1),
        tap(() => {
          this.currentIterationService.getIteration(+this.route.snapshot.paramMap.get('id')).pipe(
            catchError(() => of(false))
          ).subscribe();
        })
      )
      .subscribe();
  }

  public deleteIteration(userId: number): void {
    this.dialogService.openDeleteIterationDialog((request) => {
      if (request) {
        this.currentIterationService.deleteIteration(userId, request).subscribe();
      }
    });
  }

  public wantBeMentor(): void {
    this.dialogService.openRequestDialog('Примечание', (text) => {
      if (text !== null || text !== undefined) {
        this.route.paramMap.pipe(
          switchMap((params: ParamMap) => this.userService.createMentorRequest(params.get('id'), text)),
          takeWhile(() => this.componentActive)
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
    this.dialogService.openRequestDialog('Примечание (необязательно)', (text) => {
      if (text !== null || text !== undefined) {
        this.route.paramMap.pipe(
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
