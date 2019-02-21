import { Component, OnInit } from '@angular/core';
import { Iteration } from '../../models/iteration.model';

@Component({
  selector: 'lt-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: [ './profile-overview.component.scss' ]
})
export class ProfileOverviewComponent implements OnInit {

  constructor() {
  }

  currentIteration: Iteration = {
    id: 1,
    goal: 'Получить 5 уровень',
    format: 'YYYY-MM-DD',
    startDate: new Date('2019-01-07 11:33:05'),
    endDate: new Date('2019-02-21 11:33:05'),
    activities: [
      {type: 'meeting', title: 'Test title', date: new Date('2019-01-13 11:33:05')},
      {type: 'deploy', title: 'Test deploy', date: new Date('2019-01-19 11:33:05')}
    ]
  };

  ngOnInit() {
  }

}
