import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConfig} from '../../helpers/apiConfig';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  constructor(private http: HttpClient) { }

  getCurrentIteration(protegeId) {
    return this.http.get(`${ApiConfig.protege}/${protegeId}/iterations/current`, { ...httpOptions });
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
