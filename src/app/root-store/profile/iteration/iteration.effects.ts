import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {IterationService} from '../../../core/services/iteration.service';
import {
  CreateIterationFail,
  CreateIterationSuccess,
  IterationActionTypes,
  IterationActionUnion,
  DeleteIterationFail,
  DeleteIterationSuccess,
  GetIterationFail,
  GetIterationSuccess
} from './iteration.actions';
import {Iteration} from '../../../models/iteration.model';
import * as moment from 'moment';

@Injectable()
export class IterationEffectsService {

  constructor(
    private actions$: Actions,
    private iterationService: IterationService
  ) {}

  @Effect() getIteration: Observable<IterationActionUnion> = this.actions$.pipe(
    ofType(IterationActionTypes.GET_ITERATION_REQUEST),
    switchMap((action: IterationActionUnion) => {
      return this.iterationService.getCurrentIteration(action.payload.userId)
        .pipe(
          map(data => {
            const iteration: Iteration = new Iteration(data);
            return new GetIterationSuccess({iteration: iteration});
          }),
          catchError(err => of(new GetIterationFail({error: err.error.errors})))
        );
    })
  );

  @Effect() createIteration: Observable<IterationActionUnion> = this.actions$.pipe(
    ofType(IterationActionTypes.CREATE_ITERATION_REQUEST),
    switchMap((action: IterationActionUnion) => {
      const iteration = {
        start_date: moment(action.payload.iteration.time.startDate).format(),
        end_date: moment(action.payload.iteration.time.endDate).format(),
        goal: action.payload.iteration.goal,
        meet_type_id: action.payload.iteration.meetType,
        week_day: action.payload.iteration.weekDay,
        test_project: action.payload.iteration.projectLink
      };
      return this.iterationService.createIteration(action.payload.userId, iteration)
        .pipe(
          map(data => {
            const iter: Iteration = new Iteration(data);
            return new CreateIterationSuccess({iteration: iter});
          }),
          catchError(err => of(new CreateIterationFail({error: err.error.errors})))
        );
    })
  );

  @Effect() deleteIteration: Observable<IterationActionUnion> = this.actions$.pipe(
    ofType(IterationActionTypes.DELETE_ITERATION_REQUEST),
    switchMap((action: IterationActionUnion) => {
      return this.iterationService.deleteIteration(action.payload.userId, action.payload.iteration.id, action.payload.reason)
        .pipe(
          map(() => new DeleteIterationSuccess()),
          catchError(err => of(new DeleteIterationFail({error: err.error.errors})))
        );
    })
  );
}
