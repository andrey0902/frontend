import { Component, OnInit } from '@angular/core';
import {Iteration} from '../../models/iteration.model';

@Component({
  selector: 'lt-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss']
})
export class ProfileOverviewComponent implements OnInit {

  constructor() { }

  currentIteration: Iteration = {
    id: 1,
    goal: 'Получить 5 уровень',
    startDate: new Date(2019, 1, 7).getTime(),
    endDate: new Date(2019, 1, 21).getTime(),
    activities: [
      { type: 'meeting', title: 'Test title', date: new Date(2019, 1, 13).getTime()},
      { type: 'deploy', title: 'Test deploy', date: new Date(2019, 1, 19).getTime()}
    ]
  };

  ngOnInit() {}

}
