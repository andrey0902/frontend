import { Component, Input, OnInit } from '@angular/core';
import { InfoPlanModel } from '../../shared/models/info-plan.model';

@Component({
  selector: 'lt-full-task',
  templateUrl: './full-task.component.html',
  styleUrls: [ './full-task.component.scss' ]
})
export class FullTaskComponent implements OnInit {
  @Input() public tasks: InfoPlanModel[];
  @Input() public userId: number;
  @Input() public canEdit: boolean;
  @Input() public label: string;
  public createTask = this.createItem.bind(this);
  public level = 0;
  public goalDevValidators = {
    minLength: 2,
    maxLength: 120,
    checkSpace: true
  };

  public itemConstructor = InfoPlanModel;

  constructor() {
  }

  ngOnInit() {
  }

  public createItem(userId, bodyRequest) {
    console.log('[FullTaskComponent: createItem]', userId, bodyRequest);
    /*return this.service.createIPRGoals(userId, bodyRequest);*/
  }

  public editTask(event) {
    console.log('[FullTaskComponent: editTask]', event);
  }

  public deleteTask(event) {
    console.log('[FullTaskComponent: deleteTask]', event);
  }

  public updateTask(event) {
    console.log('[FullTaskComponent: updateTask]', event);
  }

  public addToRootCategory(event) {
    const requestBody = {
      text: event.value,
      order: this.tasks.length,
    };
    requestBody[ 'id' ] = Date.now();
    requestBody[ 'parent' ] = null;
    requestBody[ 'status' ] = 'open';
    requestBody[ 'is_completed' ] = false;
    this.tasks = [ ...this.tasks, new InfoPlanModel(requestBody) ];
    console.log('[FullTaskComponent: addToRootCategory]', event);
  }
}
