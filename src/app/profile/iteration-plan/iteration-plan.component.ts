import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IterationTaskModel} from '../../personal-plan/shared/models/iteration-plan.model';
import {ItemNode} from '../../shared/tree/models/item-node.model';
import {InfoPlanModel} from '../../personal-plan/shared/models/info-plan.model';
import {combineLatest, Observable} from 'rxjs';
import {Iteration} from '../../models/iteration.model';
import {IterationTreeService} from '../services/iteration-tree.service';
import {Store} from '@ngrx/store';
import {CreatePlanTaskRequest, DeletePlanTaskRequest, EditPlanTaskRequest, GetPlanRequest, UpdatePlanTasksRequest} from '../../root-store/profile/plan/plan.actions';
import {plan} from '../../root-store/profile/plan/plan.selectors';


@Component({
  selector: 'lt-iteration-plan',
  templateUrl: './iteration-plan.component.html',
  styleUrls: ['./iteration-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IterationPlanComponent implements OnInit {
  @Input() iteration: Iteration;
  @Input() plan: IterationTaskModel[];

  @Output() public createItem = new EventEmitter<ItemNode>();

  public itemConstructor = InfoPlanModel;

  constructor(private treeService: IterationTreeService,
              private store: Store<any>,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.dispatch(new GetPlanRequest({iterationId: this.iteration.id, userId: this.iteration.user_id}));

    this.store.select(plan)
      .subscribe((data: IterationTaskModel[]) => {
        this.plan = IterationTaskModel.treeStructureGenerator(data);
        this.cd.detectChanges();
      });
  }

  public deleteTreeItem(task: ItemNode): void {
    this.store.dispatch(new DeletePlanTaskRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, taskId: task.id}));
  }

  public createTreeItem(task: ItemNode): void {
   this.store.dispatch(new CreatePlanTaskRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, task: task as IterationTaskModel}));
  }

  public editTreeItem(task: ItemNode): void {
    this.store.dispatch(new EditPlanTaskRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, task: task as IterationTaskModel}));
  }

  public updateTreeItems(items: ItemNode[]): void {
    const checkedItemsIds: number[] = [];
    const uncheckedItemsIds: number[] = [];
    const requests: Observable<any>[] = [];

    // get ids and sort in checked/unchecked arrays
    items.forEach((item: ItemNode) => item.is_completed ? checkedItemsIds.push(item.id) : uncheckedItemsIds.push(item.id));

    // create request for checked items
    if (checkedItemsIds.length > 0) {
      this.store.dispatch(new UpdatePlanTasksRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, tasksId: checkedItemsIds, status: true}));
    }

    // create request for unchecked items
    if (uncheckedItemsIds.length > 0) {
      this.store.dispatch(new UpdatePlanTasksRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, tasksId: checkedItemsIds, status: false}));
    }
  }
}
