import {Component, Input} from '@angular/core';
import {User} from '../../../models/user.model';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'lt-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() currentUser: User;
  @Input() user: User;

  constructor(private route: Router) {
  }


  redirect() {
    if (this.currentUser) {
      const isAdmin = this.checkIsAdmin(this.currentUser);
      const currentUser = this.checkUserId(this.currentUser, this.user.id);
      const isMentor = this.checkIsMentor(this.currentUser, this.user.id);

      if (isAdmin || currentUser || isMentor) {
        this.route.navigate(['/profile', this.user.id]);
        return;
      }

      window.location.href = `${environment.redirectProfile}${this.user.attributes.portalId}`;
    }
  }

  private checkIsAdmin(user): boolean {
    return user.attributes.roles.includes('admin');
  }

  private checkUserId(user: User, id): boolean {
    return user.id === id;
  }

  private checkIsMentor(user: User, id): boolean {
    return !!user.attributes.proteges[id];
  }
}
