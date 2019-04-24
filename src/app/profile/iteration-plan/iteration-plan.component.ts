import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IterationTaskModel, TreeHelper} from '../../personal-plan/shared/models/iteration-plan.model';
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
import {errorPlan, loadingPlan, loadingPlanTask, plan} from '../../root-store/profile/plan/plan.selectors';
import {Rights} from '../profile.component';
import {map, switchMap, take, takeWhile} from 'rxjs/operators';
import {filter} from 'rxjs/internal/operators/filter';

@Component({
  selector: 'lt-iteration-plan',
  templateUrl: './iteration-plan.component.html',
  styleUrls: ['./iteration-plan.component.scss'],
})

export class IterationPlanComponent implements OnInit, OnDestroy {
  @Input() iteration: Iteration;
  @Input() plan: IterationTaskModel[] = [];
  @Input() userRights: Rights = 'mentor';

  public itemConstructor = InfoPlanModel;
  public treeEditLevel = {
    read: 0,
    current: 1,
    mentor: 2
  };
  public componentActive = true;

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetPlanRequest({iterationId: this.iteration.id, userId: this.iteration.user_id}));
    this.getPlan();
    this.updatePlanAfterError();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
    this.store.dispatch(new GetPlanSuccess({tasks: []}));
  }

  public deleteTreeItem(data): void {
    this.store.dispatch(new DeletePlanTaskRequest(
      {
        userId: this.iteration.user_id,
        iterationId: this.iteration.id,
        task: new IterationTaskModel(data.changes),
        tasks: TreeHelper.getArrayFromTree(data.tree)
      }));
  }

  public createTreeItem(data): void {
    this.store.dispatch(new CreatePlanTaskRequest(
      {
        userId: this.iteration.user_id,
        iterationId: this.iteration.id,
        task: new IterationTaskModel(data.changes),
        tasks: TreeHelper.getArrayFromTree(data.tree)
      }));
    this.getPlan(loadingPlanTask);
  }

  public editTreeItem(task: ItemNode): void {
    this.store.dispatch(new EditPlanTaskRequest({
      userId: this.iteration.user_id,
      iterationId: this.iteration.id,
      task: new IterationTaskModel(task),
    }));
  }

  public updateTreeItems(items: ItemNode[]): void {
    const tasks: IterationTaskModel[] = items.map((item: ItemNode) => new IterationTaskModel(item));
    this.store.dispatch(new UpdatePlanTasksRequest({userId: this.iteration.user_id, iterationId: this.iteration.id, tasks: tasks}));
  }

  public getPlan(selector = loadingPlan) {
    this.store.select(selector)
      .pipe(
        filter((loading) => !loading),
        switchMap(() => this.store.select(plan)),
        take(1)
      )
      .subscribe((data: IterationTaskModel[]) => this.plan = data);
  }

  public updatePlanAfterError() {
    this.store.select(errorPlan)
      .pipe(
        filter((error) => !!error)
      )
      .subscribe((data: IterationTaskModel[]) => this.getPlan());
  }
}
