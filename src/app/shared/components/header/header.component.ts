import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../models/user.model';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../../root-store/currentUser/current-user.selectors';
import {LoadUser} from '../../../root-store/currentUser/current-user.actions';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'lt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  linkToPortal: string;

  constructor(
    private userService: UserService,
    private store: Store<any>
  ) { }

  currentUser$: Observable<User>;

  ngOnInit(): void {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.store.dispatch(new LoadUser());
    this.linkToPortal = environment.redirectPath;
  }

}
