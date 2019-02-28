import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogService} from '../shared/services/dialog.service';
import {UserService} from '../../core/services/user.service';
import {Store} from '@ngrx/store';
import {LoadMentors} from '../../root-store/mentors/mentors.actions';
import {selectMentors} from '../../root-store/mentors/mentors.selectors';
import {User} from '../../models/user.model';

@Component({
  selector: 'lt-mentor-protege',
  templateUrl: './mentor-protege.component.html',
  styleUrls: ['./mentor-protege.component.scss']
})
export class MentorProtegeComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private userService: UserService,
    private store: Store<any>
  ) { }

  mentorshipList: User[];

  ngOnInit() {
    this.userService.getMentors({include: 'proteges'}).subscribe((res: User[]) => {
      console.log(res);
      this.mentorshipList = res;
    });
    // this.store.select(selectMentors).subscribe(val => {console.log(val); });
    // this.store.dispatch(new LoadMentors());
  }

  addMentor() {
    this.dialogService.openMentorshipManagementDialog({ mode: 'addMentor' }, (mentor) => {
      if (mentor) {
        this.userService.addMentor(mentor.id).subscribe((res: User) => {
          this.mentorshipList.unshift(res);
        });
      }
    });
  }

  deleteMentor(mentor) {
    const htmlContent = `<p>Вы уверены, что <b>
      ${mentor.attributes.first_name} ${mentor.attributes.last_name}</b>
      больше не ментор ?</p>`;

    this.dialogService.openConfirmDialog(htmlContent, (confirm) => {
      if (confirm) {
        this.userService.deleteMentor(mentor.id).subscribe(() => {
          const userIndex = this.mentorshipList.findIndex(mentorship => mentorship.id === mentor.id);
          this.mentorshipList = [...this.mentorshipList.slice(0, userIndex), ...this.mentorshipList.slice(userIndex + 1)];
        });
      }
    });
  }

  changeMentor(mentorship, protege) {
    this.dialogService.openMentorshipManagementDialog({
      mode: 'changeMentor',
      mentor: mentorship.attributes,
      protege: protege.attributes
    }, (mentor) => {
      if (mentor) {
        this.userService.bindProtegeToMentor(protege.id, mentor.id).subscribe((user: User) => {
          this.destroyExistingRelations(user);
          const currentMentorship = this.mentorshipList.find(item => item.id === mentor.id);
          currentMentorship.attributes.proteges.push(user);
        });
      }
    });
  }

  addProtege(mentorship) {
    this.dialogService.openMentorshipManagementDialog({
      mode: 'addProtege',
      mentor: mentorship.attributes
    }, (protege) => {
      if (protege) {
        this.userService.bindProtegeToMentor(protege.id, mentorship.id).subscribe((user: User) => {
          this.destroyExistingRelations(user);
          mentorship.attributes.proteges.push(user);
        });
      }
    });
  }

  deleteProtege(mentor, protege) {
    const htmlContent = `<p>Вы уверены, что <b>
      ${protege.attributes.first_name} ${protege.attributes.last_name}</b>
      больше не протеже для <b>${mentor.attributes.first_name}
      ${mentor.attributes.last_name}</b> ?</p>`;

    this.dialogService.openConfirmDialog(htmlContent, (result) => {
      if (result) {
        this.userService.bindProtegeToMentor(protege.id, '').subscribe((user: User) => {
          this.destroyExistingRelations(user);
        });
      }
    });
  }

  clearProtegeStatus(protege) {
    const htmlContent = `<p>Вы уверены, что хотите очистить статус протеже для <b>${protege.firstName} ${protege.lastName}</b> ?</p>`;

    this.dialogService.openConfirmDialog(htmlContent, (result) => {
      console.log('Clear protege status:', result);
    });
  }

  destroyExistingRelations(user) {
    this.mentorshipList.forEach(mentorship => {
      const index = mentorship.attributes.proteges.findIndex(protege => {
        return protege.id === user.id;
      });
      if (index !== -1) {
        mentorship.attributes.proteges.splice(index, 1);
      }
    });
  }

}
