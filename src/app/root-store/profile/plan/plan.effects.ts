import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
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
import {IterationTaskModel} from '../../../personal-plan/shared/models/iteration-plan.model';

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
            const plan: IterationTaskModel[] = [];
            data.forEach((task) => plan.push(new IterationTaskModel(task)));
            return new GetPlanSuccess({plan: plan});
          }),
          catchError(err => of(new GetPlanFail({error: err.error.errors})))
        );
    })
  );

  @Effect() createPlanTask: Observable<PlanActionUnion> = this.actions$.pipe(
    ofType(PlanActionTypes.CREATE_PLAN_TASK_REQUEST),
    switchMap((action: PlanActionUnion) => {
      const request = IterationTaskModel.requestStructureGenerator(action.payload.task);
      return this.planService.createPlanTask(action.payload.userId, action.payload.iterationId, request)
        .pipe(
          map(data => {
            const task = new IterationTaskModel(data);
            return new CreatePlanTaskSuccess({task: task});
          }),
          catchError(err => of(new CreatePlanTaskFail({error: err.error.errors})))
        );
    })
  );

  @Effect() editPlanTask: Observable<PlanActionUnion> = this.actions$.pipe(
    ofType(PlanActionTypes.EDIT_PLAN_TASK_REQUEST),
    switchMap((action: PlanActionUnion) => {
      const request = IterationTaskModel.requestStructureGenerator(action.payload.task);
      return this.planService.editPlanTask(action.payload.userId, action.payload.iterationId, action.payload.task.id, request)
        .pipe(
          map(data => {
            const task = new IterationTaskModel(data);
            return new EditPlanTaskSuccess({taskId: task.id});
          }),
          catchError(err => of(new EditPlanTaskFail({error: err.error.errors})))
        );
    })
  );

  @Effect() deletePlanTask: Observable<PlanActionUnion> = this.actions$.pipe(
    ofType(PlanActionTypes.DELETE_PLAN_TASK_REQUEST),
    switchMap((action: PlanActionUnion) => {
      return this.planService.deletePlanTask(action.payload.userId, action.payload.iterationId, action.payload.taskId)
        .pipe(
          map(() => new DeletePlanTaskSuccess({taskId: action.payload.taskId})),
          catchError(err => of(new DeletePlanTaskFail({error: err.error.errors})))
        );
    })
  );

  @Effect() updatePlanTasks: Observable<PlanActionUnion> = this.actions$.pipe(
    ofType(PlanActionTypes.UPDATE_PLAN_TASKS_REQUEST),
    switchMap((action: PlanActionUnion) => {
      return this.planService.updatePlanTasks(action.payload.userId, action.payload.iterationId,
        {id: action.payload.tasksId, is_completed: action.payload.status})
        .pipe(
          map(() => new UpdatePlanTasksSuccess({tasksId: action.payload.tasksId, status: action.payload.status})),
          catchError(err => of(new UpdatePlanTasksFail({error: err.error.errors})))
        );
    })
  );
}
