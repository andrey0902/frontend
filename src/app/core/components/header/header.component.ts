import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'lt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  currentUser: User;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

}
