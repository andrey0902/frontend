import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'lt-need-a-mentor',
  templateUrl: './need-a-mentor.component.html',
  styleUrls: ['./need-a-mentor.component.scss']
})
export class NeedAMentorComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[];

  ngOnInit() {
    this.userService.getNeedMentorUsers().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

}
