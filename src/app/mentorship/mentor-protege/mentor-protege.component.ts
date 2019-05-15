import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from '../../shared/dialog/services/dialog.service';
import {Store} from '@ngrx/store';
import {
  AddMentor,
  DeleteMentor,
  LoadMentors,
  AddProtege,
  ChangeMentor,
  DeleteProtege
} from '../../root-store/mentors/mentors.actions';
import {selectMentors} from '../../root-store/mentors/mentors.selectors';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';
import {selectCurrentUser} from '../../root-store/currentUser/current-user.selectors';
import {filter, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'lt-mentor-protege',
  templateUrl: './mentor-protege.component.html',
  styleUrls: ['./mentor-protege.component.scss']
})
export class MentorProtegeComponent implements OnInit, OnDestroy {

  constructor(
    private dialogService: DialogService,
    private store: Store<any>
  ) {
  }

  isAdmin = false;
  componentActive = true;
  mentorshipList$: Observable<User[]>;
  currentUser$: Observable<User>;
  objectValues = Object.values;

  ngOnInit() {
    this.mentorshipList$ = this.store.select(selectMentors);
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.store.dispatch(new LoadMentors());
    this.store.select(selectCurrentUser).pipe(
      takeWhile(() => this.componentActive),
      filter(user => !!user)
    ).subscribe((user: User) => {
      this.isAdmin = user.attributes.roles.some((item: string) => item.includes('admin'));
    });
  }

  addMentor() {
    this.dialogService.openMentorshipManagementDialog({mode: 'addMentor'}, (mentor) => {
      if (mentor) {
        this.store.dispatch(new AddMentor(mentor.id));
      }
    });
  }

  deleteMentor(mentor) {
    const htmlContent = `<p>Вы уверены, что <b>${mentor.attributes.fullName}</b> больше не ментор ?</p>`;

    this.dialogService.openConfirmDialog({htmlContent}, (confirm) => {
      if (confirm) {
        this.store.dispatch(new DeleteMentor(mentor.id));
      }
    });
  }

  changeMentor({mentorship, protege}) {
    this.dialogService.openMentorshipManagementDialog({
      mode: 'changeMentor',
      mentor: mentorship,
      protege: protege.attributes,
      placeholder: 'Новый ментор'
    }, (mentor) => {
      if (mentor) {
        this.store.dispatch(new ChangeMentor({protegeId: protege.id, mentorId: mentor.id, currentMentorId: mentorship.id}));
      }
    });
  }

  addProtege(mentorship) {
    this.dialogService.openMentorshipManagementDialog({
      mode: 'addProtege',
      mentor: mentorship,
      placeholder: 'Протеже'
    }, (protege) => {
      if (protege) {
        this.store.dispatch(new AddProtege({protegeId: protege.id, mentorId: mentorship.id}));
      }
    });
  }

  deleteProtege({mentor, protege}) {
    const htmlContent = `<p>Вы уверены, что <b>${protege.attributes.fullName}</b>
      больше не протеже для <b>${mentor.attributes.fullName}</b> ?</p>`;

    this.dialogService.openConfirmDialog({htmlContent}, (result) => {
      if (result) {
        this.store.dispatch(new DeleteProtege({protegeId: protege.id, mentorId: null, currentMentorId: mentor.id}));
      }
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
