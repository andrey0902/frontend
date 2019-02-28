import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../../models/user.model';
import {Store} from '@ngrx/store';
import {selectUser} from '../../../root-store/users/users.selectors';
import {LoadUsers} from '../../../root-store/users/users.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private store: Store<any>) { }

  currentUser: User;
  userSubscription: Subscription;

  ngOnInit(): void {
    this.userSubscription = this.store.select(selectUser, { id: '1' }).subscribe(val => {
      // console.log(val);
      this.currentUser = val;
    });

    this.store.dispatch(new LoadUsers());
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
