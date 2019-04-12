import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {IterationTaskModel} from '../../personal-plan/shared/models/iteration-plan.model';
import {ItemNode} from '../../shared/tree/models/item-node.model';
import {InfoPlanModel} from '../../personal-plan/shared/models/info-plan.model';
import {Iteration} from '../../models/iteration.model';
import {Store} from '@ngrx/store';
import {
  CreatePlanTaskRequest,
  DeletePlanTaskRequest,
  EditPlanTaskRequest,
  GetPlanRequest, GetPlanSuccess,
  UpdatePlanTasksRequest
} from '../../root-store/profile/plan/plan.actions';
import {errorPlan, loadingPlan} from '../../root-store/profile/plan/plan.selectors';
import {Rights} from '../profile.component';
import {take, takeWhile} from 'rxjs/operators';
import {filter} from 'rxjs/internal/operators/filter';

@Component({
  selector: 'lt-iteration-plan',
  templateUrl: './iteration-plan.component.html',
  styleUrls: ['./iteration-plan.component.scss'],
})

export class IterationPlanComponent implements OnChanges, OnInit, OnDestroy {
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
  public componentActive = true;

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.select(errorPlan)
      .pipe(
        takeWhile(() => this.componentActive),
        filter((data) => data.error)
      )
      .subscribe((data) => {
        // TODO: toster error (data.error)
        this.plan = data.plan;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.iteration && changes.iteration.currentValue) {
      this.store.dispatch(new GetPlanRequest({iterationId: this.iteration.id, userId: this.iteration.user_id}));
      this.getPlan();
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
    this.store.dispatch(new GetPlanSuccess({tasks: []}));
  }

  public deleteTreeItem(task: ItemNode): void {
    this.store.dispatch(new DeletePlanTaskRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, task: new IterationTaskModel(task)}));
  }

  public createTreeItem(task: ItemNode): void {
    this.store.dispatch(new CreatePlanTaskRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, task: new IterationTaskModel(task)}));
    this.getPlan();
  }

  public editTreeItem(task: ItemNode): void {
    this.store.dispatch(new EditPlanTaskRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, task: new IterationTaskModel(task)}));
  }

  public updateTreeItems(items: ItemNode[]): void {
    const tasks: IterationTaskModel[] = items.map((item: ItemNode) => new IterationTaskModel(item));
    this.store.dispatch(new UpdatePlanTasksRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, tasks: tasks}));
  }

  public getPlan() {
    this.store.select(loadingPlan)
      .pipe(
        filter((data) => !data.loading),
        take(1)
      )
      .subscribe((data) => this.plan = data.plan);
  }
}
