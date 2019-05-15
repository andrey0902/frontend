import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiConfig} from '../../helpers/apiConfig';
import {Iteration} from '../../models/iteration.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  constructor(private http: HttpClient) {
  }

  getCurrentIteration(protegeId: number) {
    return this.http.get(`${ApiConfig.protege}/${protegeId}/iterations/current`, {
      params: {
        include: 'meets'
      }
    });
  }

  createIteration(protegeId: number, iteration) {
    return this.http.post<Iteration>(`${ApiConfig.protege}/${protegeId}/iterations`, iteration, {
      params: {
        include: 'meets'
      }
    });
  }

  deleteIteration(protegeId: number, iterationId: number, request): Observable<any> {
    return this.http.delete(`${ApiConfig.protege}/${protegeId}/iterations/${iterationId}`, {params: request});
  }

  getMeetTypes() {
    return this.http.get(`${ApiConfig.base}/data/iterations/meet_types`);
  }
}
