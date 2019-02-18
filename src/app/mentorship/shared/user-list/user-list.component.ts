import {Component, Input} from '@angular/core';
import {User} from '../../../models/user.model';

@Component({
  selector: 'lt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  @Input() users: User[];

  onAction() {
    console.log('Action btn click');
  }

}
