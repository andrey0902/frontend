import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';


@Component({
  selector: 'lt-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  @Input() public user: User;
  @Input() PERMISSION_GROUPS: any;
  @Input() nav_links: any;
  @Input() countMessages: number;
  public permissionForView: any;

  public ngOnInit() {
    this.permissionForView = {
      ban_groups: [
        this.PERMISSION_GROUPS.NOT_APPROVED
      ]
    };
  }
}
