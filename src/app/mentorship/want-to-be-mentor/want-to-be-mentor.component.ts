import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {User} from '../../models/user.model';
import {DialogService} from '../shared/services/dialog.service';

@Component({
  selector: 'lt-want-to-be-mentor',
  templateUrl: './want-to-be-mentor.component.html',
  styleUrls: ['./want-to-be-mentor.component.scss']
})
export class WantToBeMentorComponent implements OnInit {

  constructor(
    private userService: UserService,
    private dialogService: DialogService
  ) { }

  users: User[];

  ngOnInit() {
    // this.userService.getBecomeMentorUsers().subscribe(users => {
    //   this.users = users;
    //   console.log(this.users);
    // });
  }

  clearStatus(user) {
    const htmlContent = `<p>Вы уверены, что хотите очистить статус «Хочу быть ментором» для <b>${user.firstName} ${user.lastName}</b> ?</p>`;

    this.dialogService.openConfirmDialog(htmlContent, (result) => {
      console.log('Clear want-be-mentor status:', result);
    });
  }

}
