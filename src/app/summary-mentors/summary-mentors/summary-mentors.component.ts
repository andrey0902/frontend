import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from '../../shared/dialog/services/dialog.service';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { selectMentors, selectMentorsLoad } from '../../root-store/mentors/mentors.selectors';
import { selectCurrentUser } from '../../root-store/currentUser/current-user.selectors';
import { LoadMentors, LoadProtegeIteration } from '../../root-store/mentors/mentors.actions';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { LtValidators } from '../../shared/helpers/validator-methods.static';
import { MentorProtegeId } from '../shared/models/mentor-protege-id.model';

@Component({
  selector: 'lt-summary-mentors',
  templateUrl: './summary-mentors.component.html',
  styleUrls: ['./summary-mentors.component.scss']
})
export class SummaryMentorsComponent implements OnInit, OnDestroy {

  constructor(
    private dialogService: DialogService,
    private store: Store<any>
  ) {
  }

  isLoad: boolean;

  isAdmin = false;
  componentActive = true;
  mentorshipList: User[];
  currentUser$: Observable<User>;
  objectValues = Object.values;

  filteredOptions$: Observable<User[]>;
  userInput: FormControl = new FormControl('', [LtValidators.noWhitespaceValidator]);
  selectedUser: User;

  /* need*/

  fetchIteration(data: MentorProtegeId) {
    this.store.dispatch(new LoadProtegeIteration(data));
  }
  /**/

  ngOnInit() {
    this.store.select(selectMentorsLoad)
      .pipe(
        takeWhile(() => this.componentActive)
      )
      .subscribe((res: boolean) => {
        console.log('res isLoad$', res);
        this.isLoad = res;
      });;
    this.store.select(selectMentors)
      .pipe(
        takeWhile(() => this.componentActive)
      )
      .subscribe((res: User[]) => {
      console.log('res', res);
      this.mentorshipList = res;
    });
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.store.dispatch(new LoadMentors());
    this.store.select(selectCurrentUser).pipe(
      takeWhile(() => this.componentActive),
      filter(user => !!user)
    ).subscribe((user: User) => {
      this.isAdmin = user.attributes.roles.some((item: string) => item.includes('admin'));
    });


    this.filteredOptions$ = this.userInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => {
          if (this.userInput.invalid) {
            return of([]);
          }
          return of([]);
          // return this.userService.getUsers({
          //   name: value,
          //   ...this.modeMap[this.data.mode],
          //   proteges_limit: 1
          // })
          //   .pipe(
          //     map((res: any[]) => res.map(user => new User(user)))
          //   );
        })
      );
  }






  displayFn(user) {
    return user ? user.attributes.fullName : '';
  }

  selectUser(event) {
    this.selectedUser = event.option.value;
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
