import {catchError, map, skip} from 'rxjs/operators';
import {Iteration} from '../../models/iteration.model';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import * as moment from 'moment';
import {IterationService} from '../../core/services/iteration.service';
import {tap} from 'rxjs/internal/operators/tap';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class CurrentIterationService {
  private _currentIteration: BehaviorSubject<Iteration> = new BehaviorSubject(null);
  private _isNew = true;

  constructor(private _iterationService: IterationService) {
  }

  get currentIteration(): Iteration {
    return this._currentIteration.getValue();
  }

  set currentIteration(iteration: Iteration) {
    this._currentIteration.next(iteration);
  }

  public get isExist(): boolean {
    return this.currentIteration !== null;
  }

  public get isNew(): boolean {
    return this._isNew;
  }

  public getIteration(protegeId: number) {
    this._isNew = false;
    return this._iterationService.getCurrentIteration(protegeId)
      .pipe(
        map(data => new Iteration(data)),
        tap((itr: Iteration) => this.currentIteration = itr),
        catchError(() => of(true))
      );
  }

  public createIteration(protegeId, payload): Observable<Iteration> {
    const iteration = {
      start_date: moment(payload.startDate).format(),
      end_date: moment(payload.endDate).format(),
      goal: payload.goal,
      meet_type_id: payload.meetType,
      week_day: payload.weekDay,
      test_project: payload.projectLink
    };

    return this._iterationService.createIteration(protegeId, payload, iteration)
      .pipe(
        map(data => new Iteration(data)),
        tap((itr: Iteration) => this.currentIteration = itr)
      );
  }

  public deleteIteration(protegeId: number): Observable<any> {
    const request = {
      conclusion: 'hi',
      test_project: 'null'
    };

    return this._iterationService.deleteIteration(protegeId, this.currentIteration.id, request)
      .pipe(
        tap(() => this.currentIteration = null)
      );
  }
}
