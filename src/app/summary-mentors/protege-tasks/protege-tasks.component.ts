import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { InfoPlanModel } from '../../personal-plan/shared/models/info-plan.model';
import { IterationTaskModel } from '../../personal-plan/shared/models/iteration-plan.model';
@Component({
  selector: 'lt-protege-tasks',
  templateUrl: './protege-tasks.component.html',
  styleUrls: ['./protege-tasks.component.scss'],
  animations: [
    trigger(
      'appear', [
        transition(':enter', [
          style({
            overflow: 'hidden',
            height: 0,
            opacity: 0,
          }),
          animate('400ms ease-in-out', style({height: '*', opacity: 1}))
        ]),
        transition(':leave', [
          style({
            opacity: 1,
            overflow: 'hidden',
            height: '*',
          }),
          animate('400ms ease-in-out', style({height: '0px', opacity: 0}))
        ])
      ]
    )
  ]
})
export class ProtegeTasksComponent implements OnInit {
  @Input() isOpen;
  @Input() tasks: IterationTaskModel[];
  public itemConstructor = InfoPlanModel;
  constructor() { }

  ngOnInit() {
  }

}
