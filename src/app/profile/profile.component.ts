import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/services/user.service';
import {User} from '../models/user.model';

@Component({
  selector: 'lt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  user: User;
  // navLinks = [
  //   { path: './overview', label: 'Обзор' },
  //   { path: './need-a-mentor', label: 'Итерации' },
  //   { path: './want-to-be-mentor', label: 'Активность' }
  // ];

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => this.user = user);
  }

}
