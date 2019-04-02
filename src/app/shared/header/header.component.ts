import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {User} from '../../models/user.model';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../root-store/currentUser/current-user.selectors';
import {LoadUser} from '../../root-store/currentUser/current-user.actions';
import {Observable, timer} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CookieStorageService} from '../../core/services/cookie-storage.service';
import {GroupsService} from './services/groups.service';
import {TrustboxService} from './services/trustbox.service';
import {switchMap} from 'rxjs/operators';
import {takeWhile} from 'rxjs/internal/operators/takeWhile';

@Component({
  selector: 'lt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  PERMISSION_GROUPS: any;
  nav_links: any;
  countMessages: number;
  loaded = true;

  constructor(
    private userService: UserService,
    private cookieService: CookieStorageService,
    private trustboxService: TrustboxService,
    private cd: ChangeDetectorRef,
    private store: Store<any>
  ) {
  }

  currentUser: User;

  ngOnInit(): void {
    this.store.select(selectCurrentUser).subscribe((user) => {
      this.currentUser = user;
      this.cd.detectChanges();
    });

    this.store.dispatch(new LoadUser());
    this.PERMISSION_GROUPS = GroupsService.PERMISSION_GROUPS;
    this.nav_links = GroupsService.get_nav_links(environment.portalSitePath);
    this.getUnreadMessages();
  }

  getUnreadMessages() {
    if (!GroupsService.checkGroup([GroupsService.PERMISSION_GROUPS.SECURITY], this.cookieService.permissions)) {
      timer(0, 30000).pipe(
        takeWhile(() => this.loaded),
        switchMap(() => this.trustboxService.getUnreadCountMessage())
      ).subscribe((count) => {
        if (this.countMessages !== count) {
          console.log(count);
          this.countMessages = count;
          this.cd.detectChanges();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.loaded = false;
  }
}
