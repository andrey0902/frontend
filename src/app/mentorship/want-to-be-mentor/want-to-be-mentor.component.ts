import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'lt-want-to-be-mentor',
  templateUrl: './want-to-be-mentor.component.html',
  styleUrls: ['./want-to-be-mentor.component.scss']
})
export class WantToBeMentorComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[];

  ngOnInit() {
    this.userService.getBecomeMentorUsers().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

}
