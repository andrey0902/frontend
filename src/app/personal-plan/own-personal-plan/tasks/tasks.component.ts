import { Component, Input, OnInit } from '@angular/core';
import { InfoPlanModel } from '../../shared/models/info-plan.model';

@Component({
  selector: 'lt-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() public tasks: InfoPlanModel[];
  @Input() public userId: number;
  @Input() public canEdit: boolean;
  constructor() { }

  ngOnInit() {
  }

}
