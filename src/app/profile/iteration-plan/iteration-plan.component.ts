import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IterationTaskModel, TreeHelper} from '../../personal-plan/shared/models/iteration-plan.model';
import {ItemNode} from '../../shared/tree/models/item-node.model';
import {InfoPlanModel} from '../../personal-plan/shared/models/info-plan.model';
import {Iteration} from '../../models/iteration.model';
import {IterationTreeService} from '../services/iteration-tree.service';
import {Store} from '@ngrx/store';
import {CreatePlanTaskRequest, DeletePlanTaskRequest, EditPlanTaskRequest, GetPlanRequest, UpdatePlanTasksRequest} from '../../root-store/profile/plan/plan.actions';
import {plan} from '../../root-store/profile/plan/plan.selectors';
import {filter, first, take} from 'rxjs/operators';


@Component({
  selector: 'lt-iteration-plan',
  templateUrl: './iteration-plan.component.html',
  styleUrls: ['./iteration-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IterationPlanComponent implements OnInit {
  @Input() iteration: Iteration;
  @Input() plan: ItemNode[];

  @Output() public createItem = new EventEmitter<ItemNode>();

  public itemConstructor = InfoPlanModel;

  constructor(private treeService: IterationTreeService,
              private store: Store<any>,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.dispatch(new GetPlanRequest({iterationId: this.iteration.id, userId: this.iteration.user_id}));

    this.store.select(plan)
      .pipe(
        first((data) => !!data && data.length > 0)
      )
      .subscribe((data: IterationTaskModel[]) => {
        this.plan = TreeHelper.treeStructureGenerator(data) as ItemNode[];
        this.cd.detectChanges();
      });
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
}
