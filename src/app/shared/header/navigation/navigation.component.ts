import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user.model';
import {ItemNode} from '../../tree/models/item-node.model';


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
  @Output() public logouting = new EventEmitter();
  public permissionForView: any;

  public ngOnInit() {
    this.permissionForView = {
      ban_groups: [
        this.PERMISSION_GROUPS.NOT_APPROVED
      ]
    };
  }

  logout() {
    this.logouting.emit();
  }
}
