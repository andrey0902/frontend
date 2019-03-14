import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConfig} from '../../helpers/apiConfig';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  constructor(private http: HttpClient) { }

  getCurrentIteration(protegeId) {
    return this.http.get(`${ApiConfig.protege}/${protegeId}/iterations/current`);
  }

  createIteration(protegeId, payload) {
    const iteration = {
      start_date: moment(payload.startDate).format(),
      end_date: moment(payload.endDate).format(),
      goal: payload.goal,
      meet_type_id: payload.meetType,
      week_day: payload.weekDay,
      test_project: payload.projectLink
    };

    return this.http.post(`${ApiConfig.protege}/${protegeId}/iterations`, iteration);
  }

  getMeetTypes() {
    return this.http.get(`${ApiConfig.base}/data/iterations/meet_types`);
  }
}
