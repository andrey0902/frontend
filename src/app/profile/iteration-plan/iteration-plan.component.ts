import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IterationTaskModel} from '../../personal-plan/shared/models/iteration-plan.model';
import {ItemNode} from '../../shared/tree/models/item-node.model';
import {InfoPlanModel} from '../../personal-plan/shared/models/info-plan.model';
import {Iteration} from '../../models/iteration.model';
import {IterationTreeService} from '../services/iteration-tree.service';
import {Store} from '@ngrx/store';
import {CreatePlanTaskRequest, DeletePlanTaskRequest, EditPlanTaskRequest, GetPlanRequest, UpdatePlanTasksRequest} from '../../root-store/profile/plan/plan.actions';
import {plan, planWithNewTask} from '../../root-store/profile/plan/plan.selectors';
import {filter, first} from 'rxjs/operators';
import {Rights} from '../profile.component';

@Component({
  selector: 'lt-iteration-plan',
  templateUrl: './iteration-plan.component.html',
  styleUrls: ['./iteration-plan.component.scss'],
})

export class IterationPlanComponent implements OnChanges, OnInit {
  @Input() iteration: Iteration;
  @Input() plan: IterationTaskModel[] = [];
  @Input() userRights: Rights = 'mentor';

  @Output() public createItem = new EventEmitter<ItemNode>();

  public itemConstructor = InfoPlanModel;
  public treeEditLevel = {
    alien: 0,
    current: 1,
    mentor: 2
  };

  constructor(private treeService: IterationTreeService,
              private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.select(planWithNewTask)
      .pipe(
        filter((data: IterationTaskModel[]) => !!data)
      )
      .subscribe((data: IterationTaskModel[]) => {
        this.plan = data;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.iteration && changes.iteration.currentValue) {
      this.store.dispatch(new GetPlanRequest({iterationId: this.iteration.id, userId: this.iteration.user_id}));
      this.getPlanFromStore();
    }
  }

  public deleteTreeItem(task: ItemNode): void {
    console.log('delete');
    this.store.dispatch(new DeletePlanTaskRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, task: new IterationTaskModel(task)}));
  }

  public createTreeItem(task: ItemNode): void {
    console.log('create');
    this.store.dispatch(new CreatePlanTaskRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, task: new IterationTaskModel(task)}));
  }

  public editTreeItem(task: ItemNode): void {
    console.log('edit');
    this.store.dispatch(new EditPlanTaskRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, task: new IterationTaskModel(task)}));
  }

  public updateTreeItems(items: ItemNode[]): void {
    console.log('update');
    const tasks: IterationTaskModel[] = items.map((item: ItemNode) => new IterationTaskModel(item));
    this.store.dispatch(new UpdatePlanTasksRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, tasks: tasks}));
  }

  private getPlanFromStore() {
    this.store.select(plan)
      .pipe(
        filter((data: IterationTaskModel[]) => !!data),
        first((data: IterationTaskModel[]) => !data.length || this.plan.length !== data.length || this.plan[0].id !== data[0].id)
      )
      .subscribe((data: IterationTaskModel[]) => {
        this.plan = data;
      });
  }
}
