import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../../models/user.model';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../../root-store/currentUser/current-user.selectors';
import {LoadUser} from '../../../root-store/currentUser/current-user.actions';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'lt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private store: Store<any>
  ) { }

  currentUser$: Observable<User>;

  ngOnInit(): void {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.store.dispatch(new LoadUser(2));
  }

}
