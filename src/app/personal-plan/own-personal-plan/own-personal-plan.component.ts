import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwnPlanModel } from '../shared/models/own-plan.model';
import { InfoPlanModel } from '../shared/models/info-plan.model';

@Component({
  selector: 'lt-own-personal-plan',
  templateUrl: './own-personal-plan.component.html',
  styleUrls: [ './own-personal-plan.component.scss' ]
})
export class OwnPersonalPlanComponent implements OnInit {

  public plan: OwnPlanModel;
  public tasks: InfoPlanModel[];
  public canEdit = true;
  public userId: number;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((value: any) => {
      this.plan = value.plan;
      this.tasks = this.plan.tasks;
    });

    this.route.params.subscribe(params => {
      if (this.userId !== params.id) {
        this.userId = params.id;
      }
    });
  }

  ngOnInit() {
  }

}
