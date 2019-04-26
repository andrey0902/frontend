import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../root-store/currentUser/current-user.selectors';
import { filter, map, takeWhile } from 'rxjs/operators';
import {User} from '../models/user.model';
import { selectMentorRequests } from '../root-store/mentor-requests/mentor-requests.selectors';
import { LoadMentorRequests } from '../root-store/mentor-requests/mentor-requests.actions';
import { selectProtegeRequests } from '../root-store/protege-requests/protege-requests.selectors';
import { LoadProtegeRequests } from '../root-store/protege-requests/protege-requests.actions';
import { MentorshipService } from './shared/mentorship.service';

export enum typeRoutes {
  wantToBeMentor = 0,
  needMentor = 1
}

@Component({
  selector: 'lt-mentorship',
  templateUrl: './mentorship.component.html',
  styleUrls: ['./mentorship.component.scss']
})
export class MentorshipComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<any>,
    private mentorshipService: MentorshipService
  ) { }

  isAdmin = false;
  componentActive = true;
  navLinks = [
    { path: './', label: 'Менторы и протеже' },
    { path: './need-a-mentor', label: 'Нуждаюсь в менторе', routName: typeRoutes.needMentor },
    { path: './want-to-be-mentor', label: 'Хочу быть ментором', routName: typeRoutes.wantToBeMentor },
    { path: './summary', label: 'Сводка' },
  ];

  ngOnInit() {
    this.store.select(selectCurrentUser).pipe(
      takeWhile(() => this.componentActive),
      filter(user => !!user)
    ).subscribe((user: User) => {
      this.isAdmin = user.attributes.roles.some((item: string) => item.includes('admin'));
    });

    this.getUserThatWantToBeMentor();
    this.store.dispatch(new LoadMentorRequests());
    this.getUserThatNeedMentor();

    this.store.dispatch(new LoadProtegeRequests());
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  private getUserThatNeedMentor() {
    this.store.select(selectProtegeRequests)
      .pipe(
      takeWhile(() => this.componentActive),
      map((data: any) => {
        return this.mentorshipService.getObjectLength(data);
      }))
      .subscribe((result) => {
        this.navLinks = this.mentorshipService.addBadge(this.navLinks, {
          routName: typeRoutes.needMentor,
          count: result
        });
      });
  }

  private getUserThatWantToBeMentor() {
    this.store.select(selectMentorRequests)
      .pipe(
        takeWhile(() => this.componentActive),
        map((data: any) => {
          return this.mentorshipService.getObjectLength(data);
        })
      )
      .subscribe((result) => {
         this.navLinks = this.mentorshipService.addBadge(this.navLinks, {
           routName: typeRoutes.wantToBeMentor,
           count: result
         });
      });
  }

}
