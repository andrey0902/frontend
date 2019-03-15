import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ApiConfig} from '../../helpers/apiConfig';
import {Observable} from 'rxjs';
import {Iteration} from '../../models/iteration.model';
import {tap} from 'rxjs/internal/operators/tap';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Token 14119a9241b7432e424ee0d7b2ab75772663d259'
  })
};

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  constructor(private http: HttpClient) { }

  getCurrentIteration(protegeId): Observable<Iteration> {
    httpOptions['params'] = new HttpParams().set('include', 'meets,plans');
    return this.http.get(`${ApiConfig.protege}/${protegeId}/iterations/current`, { ...httpOptions })
      .pipe(
        map((config) => new Iteration(config))
      );
  }

  createIteration(protegeId, payload) {
    const iteration = {
      start_date: payload.startDate,
      end_date: payload.endDate,
      goal: payload.goal,
      meet_type_id: payload.meetType,
      week_day: payload.weekDay,
      test_project: payload.projectLink
    };

    return this.http.post(
      `${ApiConfig.protege}/${protegeId}/iterations`,
      iteration,
      { ...httpOptions }
    );
  }

  getMeetTypes() {
    return this.http.get(`${ApiConfig.base}/data/iterations/meet_types`, { ...httpOptions });
  }
}
