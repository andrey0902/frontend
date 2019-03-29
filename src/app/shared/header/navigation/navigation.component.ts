import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import {User} from '../../../models/user.model';


@Component({
  selector: 'lt-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit, OnDestroy {
  @Input() public user: User;
  @Input() PERMISSION_GROUPS: any;
  @Output() public logout: EventEmitter<any>;
  @ViewChild('menuEmployees') public menuEmployees: any;
  @ViewChild('menuMentorship') public menuMentorship: any;
  @ViewChild('menuDropdownLife') public menuDropdownLife: any;
  @ViewChild('dropdownUserNavMenu') public dropdownUserNavMenu: any;

  public isHover: boolean;
  public isVisibleSalary: boolean;
  public permissionForView: any;
  public tourStateSubscription: Subscription;
  public mentoringLink: string;

  constructor(private cdr: ChangeDetectorRef) {
    this.isHover = true;
    this.isVisibleSalary = true;
    this.logout = new EventEmitter();
  }

  public logOut() {
    this.logout.emit();
  }

  public ngOnInit() {
    this.permissionForView = {
      ban_groups: [
        this.PERMISSION_GROUPS.NOT_APPROVED
      ]
    };

/*    this.tourStateSubscription = this.tourSettingsService.changeStateTourSource$
      .subscribe((state) => {
        const type = TourVocabularyHelper.TOUR_TYPES.MENU;

        if (state.hasOwnProperty(type)) {
          this.isHover = !state[type];
          this.cdr.detectChanges();
        }
      });*/

  //  this.mentoringLink = environment.basePathMentoring;
  }

  public ngOnDestroy() {
    this.tourStateSubscription.unsubscribe();
  }
}
