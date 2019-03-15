import {Component, Input, OnInit} from '@angular/core';
import { Iteration } from '../../models/iteration.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'lt-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: [ './profile-overview.component.scss' ]
})
export class ProfileOverviewComponent implements OnInit {
  @Input() iteration: any;
  @Input() user: User;

  public objectValues = Object.values;
  constructor() {
  }

  currentIteration: Iteration = {
    id: 1,
    goal: 'Получить 5 уровень',
    format: 'YYYY-MM-DD',
    startDate: new Date('2019-01-07 11:33:05'),
    endDate: new Date('2019-04-21 11:33:05'),
    activities: [
      {type: 'meeting', title: 'Test title', date: new Date('2019-01-13 11:33:05')},
      {type: 'deploy', title: 'Test deploy', date: new Date('2019-01-19 11:33:05')}
    ]
  };

  ngOnInit() {
  }

}
