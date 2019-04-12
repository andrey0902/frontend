import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../root-store/currentUser/current-user.selectors';
import {filter, takeWhile} from 'rxjs/operators';
import {User} from '../models/user.model';

@Component({
  selector: 'lt-mentorship',
  templateUrl: './mentorship.component.html',
  styleUrls: ['./mentorship.component.scss']
})
export class MentorshipComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<any>
  ) { }

  isAdmin = false;
  componentActive = true;
  navLinks = [
    { path: './', label: 'Менторы и протеже' },
    { path: './need-a-mentor', label: 'Нуждаюсь в менторе' },
    { path: './want-to-be-mentor', label: 'Хочу быть ментором' }
  ];

  ngOnInit() {
    this.store.select(selectCurrentUser).pipe(
      takeWhile(() => this.componentActive),
      filter(user => !!user)
    ).subscribe((user: User) => {
      this.isAdmin = user.attributes.roles.some((item: string) => item.includes('admin'));
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
