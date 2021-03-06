import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {combineLatest, Observable, of} from 'rxjs';
import {catchError, map, share, switchMap} from 'rxjs/operators';
import {IterationPlanService} from '../../../core/services/iteration-plan.service';
import {
  CreatePlanTaskFail,
  CreatePlanTaskSuccess, DeletePlanTaskFail,
  DeletePlanTaskSuccess,
  EditPlanTaskFail,
  EditPlanTaskSuccess,
  GetPlanFail,
  GetPlanSuccess,
  PlanActionTypes,
  PlanActionUnion, UpdatePlanTasksFail, UpdatePlanTasksSuccess
} from './plan.actions';
import {IterationTaskModel, IterationTaskModelByConfig} from '../../../models/iteration-plan.model';
import {TreeHelper} from '../../../helpers/tree.helper';

@Injectable()
export class PlanEffectsService {

  constructor(
    private actions$: Actions,
    private planService: IterationPlanService
  ) {
  }

  @Effect() getPlan: Observable<PlanActionUnion> = this.actions$.pipe(
    ofType(PlanActionTypes.GET_PLAN_REQUEST),
    switchMap((action: PlanActionUnion) => {
      return this.planService.getPlan(action.payload.userId, action.payload.iterationId)
        .pipe(
          map(data => {
            const tasks: IterationTaskModel[] = data.map((task) => new IterationTaskModelByConfig(task));
            return new GetPlanSuccess({tasks: tasks});
          }),
          catchError(err => of(new GetPlanFail({error: err.error.error})))
        );
    })
  );

  @Effect() createPlanTask: Observable<PlanActionUnion> = this.actions$.pipe(
    ofType(PlanActionTypes.CREATE_PLAN_TASK_REQUEST),
    switchMap((action: PlanActionUnion) => {
      return this.planService.createPlanTask(action.payload.userId, action.payload.iterationId, action.payload.task.request())
        .pipe(
          map(data => {
            const newTask = new IterationTaskModelByConfig(data);
            action.payload.tasks.push(newTask);
            return new CreatePlanTaskSuccess({tasks: action.payload.tasks});
          }),
          catchError(err => of(new CreatePlanTaskFail({error: err.error.error})))
        );
    })
  );

  @Effect() editPlanTask: Observable<PlanActionUnion> = this.actions$.pipe(
    ofType(PlanActionTypes.EDIT_PLAN_TASK_REQUEST),
    switchMap((action: PlanActionUnion) => {
      return this.planService.editPlanTask(action.payload.userId, action.payload.iterationId, action.payload.task.id, action.payload.task.request())
        .pipe(
          map(() => new EditPlanTaskSuccess({tasks: action.payload.tasks})),
          catchError(err => of(new EditPlanTaskFail({error: err.error.error})))
        );
    })
  );

  @Effect() deletePlanTask: Observable<PlanActionUnion> = this.actions$.pipe(
    ofType(PlanActionTypes.DELETE_PLAN_TASK_REQUEST),
    switchMap((action: PlanActionUnion) => {
      return this.planService.deletePlanTask(action.payload.userId, action.payload.iterationId, action.payload.task.id)
        .pipe(
          map(() => {
            const nodeIds: number[] = TreeHelper.getAllNodeIds(action.payload.task);
            return new DeletePlanTaskSuccess({tasksId: nodeIds});
          }),
          catchError(err => of(new DeletePlanTaskFail({error: err.error.error})))
        );
    })
  );

  @Effect() updatePlanTasks: Observable<PlanActionUnion> = this.actions$.pipe(
    ofType(PlanActionTypes.UPDATE_PLAN_TASKS_REQUEST),
    switchMap((action: PlanActionUnion) => {
      return combineLatest(...this.createRequestsForUpdate(action))
        .pipe(
          map((data) => {
            const tasks: IterationTaskModel[] = [];
            data.forEach((array) => {
              if (array) {
                tasks.push(...array.map(config => new IterationTaskModelByConfig(config)));
              }
            });
            return new UpdatePlanTasksSuccess({tasks: tasks});
          }),
          catchError(err => of(new UpdatePlanTasksFail({error: err.error.error})))
        );
    })
  );

  public createRequestsForUpdate(action: PlanActionUnion): Observable<any>[] {
    const checkedItemsIds: number[] = [];
    const uncheckedItemsIds: number[] = [];
    const requests: Observable<any>[] = [];
    action.payload.tasks.forEach((task: IterationTaskModel) => task.is_completed ? checkedItemsIds.push(+task.id) : uncheckedItemsIds.push(+task.id));

    if (checkedItemsIds.length > 0) {
      requests.push(this.planService.updatePlanTasks(action.payload.userId, action.payload.iterationId,
        {id: checkedItemsIds, is_completed: true}));
    }

    if (uncheckedItemsIds.length > 0) {
      requests.push(this.planService.updatePlanTasks(action.payload.userId, action.payload.iterationId,
        {id: uncheckedItemsIds, is_completed: false}));
    }

    return requests;
  }
}
