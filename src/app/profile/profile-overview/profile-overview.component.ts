import {Component, Input} from '@angular/core';
import {Iteration} from '../../models/iteration.model';
import {Rights} from '../profile.component';

@Component({
  selector: 'lt-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss'],
})

export class ProfileOverviewComponent {
  @Input() currentIteration: Iteration;
  @Input() userRights: Rights;
}
