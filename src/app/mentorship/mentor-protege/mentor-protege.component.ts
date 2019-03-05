import { Component, OnInit } from '@angular/core';
import {DialogService} from '../shared/services/dialog.service';
import {UserService} from '../../core/services/user.service';
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
import {UsersMap} from '../../models/user.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'lt-mentor-protege',
  templateUrl: './mentor-protege.component.html',
  styleUrls: ['./mentor-protege.component.scss']
})
export class MentorProtegeComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
    private store: Store<any>
  ) { }

  mentorshipList$: Observable<UsersMap>;
  objectValues = Object.values;

  ngOnInit() {
    this.mentorshipList$ = this.store.select(selectMentors);
    this.store.dispatch(new LoadMentors());
  }

  addMentor() {
    this.dialogService.openMentorshipManagementDialog({ mode: 'addMentor' }, (mentor) => {
      if (mentor) { this.store.dispatch(new AddMentor(mentor.id)); }
    });
  }

  deleteMentor(mentor) {
    const htmlContent = `<p>Вы уверены, что <b>${mentor.attributes.fullName}</b> больше не ментор ?</p>`;

    this.dialogService.openConfirmDialog({ htmlContent }, (confirm) => {
      if (confirm) { this.store.dispatch(new DeleteMentor(mentor.id)); }
    });
  }

  changeMentor(mentorship, protege) {
    this.dialogService.openMentorshipManagementDialog({
      mode: 'changeMentor',
      mentor: mentorship.attributes,
      protege: protege.attributes,
      placeholder: 'Новый ментор'
    }, (mentor) => {
      if (mentor) { this.store.dispatch(new ChangeMentor({protegeId: protege.id, mentorId: mentor.id, currentMentorId: mentorship.id})); }
    });
  }

  addProtege(mentorship) {
    this.dialogService.openMentorshipManagementDialog({
      mode: 'addProtege',
      mentor: mentorship.attributes,
      placeholder: 'Протеже'
    }, (protege) => {
      if (protege) { this.store.dispatch(new AddProtege({protegeId: protege.id, mentorId: mentorship.id})); }
    });
  }

  deleteProtege(mentor, protege) {
    const htmlContent = `<p>Вы уверены, что <b>${protege.attributes.fullName}</b>
      больше не протеже для <b>${mentor.attributes.fullName}</b> ?</p>`;

    this.dialogService.openConfirmDialog({ htmlContent }, (result) => {
      if (result) { this.store.dispatch(new DeleteProtege({protegeId: protege.id, mentorId: '', currentMentorId: mentor.id})); }
    });
  }

  clearProtegeStatus(protege) {
    const htmlContent = `<p>Вы уверены, что хотите очистить статус протеже для <b>${protege.attributes.fullName}</b> ?</p>`;

    this.dialogService.openConfirmDialog({ htmlContent }, (result) => {
      console.log('Clear protege status:', result);
    });
  }

}
