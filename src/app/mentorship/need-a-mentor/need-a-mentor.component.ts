import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {User} from '../../models/user.model';
import {DialogService} from '../shared/services/dialog.service';

@Component({
  selector: 'lt-need-a-mentor',
  templateUrl: './need-a-mentor.component.html',
  styleUrls: ['./need-a-mentor.component.scss']
})
export class NeedAMentorComponent implements OnInit {

  constructor(
    private userService: UserService,
    private dialogService: DialogService
  ) { }

  users: User[];

  ngOnInit() {
    // this.userService.getNeedMentorUsers().subscribe(users => {
    //   this.users = users;
    //   console.log(this.users);
    // });
  }

  clearStatus(user) {
    const htmlContent = `<p>Вы уверены, что хотите очистить статус «Нуждаюсь в менторе» для <b>${user.firstName} ${user.lastName}</b> ?</p>`;

    this.dialogService.openConfirmDialog(htmlContent, (result) => {
      console.log('Clear need-mentor status:', result);
    });
  }

}
