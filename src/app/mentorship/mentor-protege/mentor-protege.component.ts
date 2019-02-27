import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {MentorshipManagementDialogComponent} from '../shared/mentorship-management-dialog/mentorship-management-dialog.component';
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
    this.dialogService.openMentorshipManagementDialog('addMentor', (mentor) => {
      if (mentor) {
        this.userService.addMentor(mentor.id).subscribe((res: User) => {
          this.mentorshipList.unshift(res);
        });
      }
    });
  }

  deleteMentor(mentor) {
    const htmlContent = `<p>Вы уверены, что <b>${mentor.attributes.first_name} ${mentor.attributes.last_name}</b> больше не ментор ?</p>`;

    this.dialogService.openConfirmDialog(htmlContent, (confirm) => {
      console.log('Delete mentor:', confirm);
      if (confirm) {
        this.userService.deleteMentor(mentor.id).subscribe(() => {
          const userIndex = this.mentorshipList.findIndex(mentorship => mentorship.id === mentor.id);
          this.mentorshipList = [...this.mentorshipList.slice(0, userIndex), ...this.mentorshipList.slice(userIndex + 1)];
        });
      }
    });
  }

  deleteProtege(mentor, protege) {
    const htmlContent = `<p>Вы уверены, что <b>${protege.firstName} ${protege.lastName}</b> больше не протеже для <b>${mentor.firstName} ${mentor.lastName}</b> ?</p>`;

    this.dialogService.openConfirmDialog(htmlContent, (result) => {
      console.log('Delete protege:', result);
    });
  }

  clearProtegeStatus(protege) {
    const htmlContent = `<p>Вы уверены, что хотите очистить статус протеже для <b>${protege.firstName} ${protege.lastName}</b> ?</p>`;

    this.dialogService.openConfirmDialog(htmlContent, (result) => {
      console.log('Clear protege status:', result);
    });
  }

}
