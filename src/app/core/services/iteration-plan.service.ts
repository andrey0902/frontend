import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiConfig} from '../../helpers/apiConfig';

@Injectable({
  providedIn: 'root'
})

export class IterationPlanService {

  constructor(private http: HttpClient) {
  }

  public getPlan( userId: number, iterationId: number): Observable<any> {
    return this.http.get(`${ApiConfig.protege}/${userId}/iterations/${iterationId}/plans/tasks`);
  }

  public createPlanTask(userId: number, iterationId: number, request): Observable<any> {
    return this.http.post(`${ApiConfig.protege}/${userId}/iterations/${iterationId}/plans/tasks`, request);
  }

  public editPlanTask(userId: number, iterationId: number, taskId: number, request): Observable<any> {
    return this.http.patch(`${ApiConfig.protege}/${userId}/iterations/${iterationId}/plans/tasks/${taskId}`, request);
  }

  public deletePlanTask(userId: number, iterationId: number, taskId: number): Observable<any> {
    return this.http.delete(`${ApiConfig.protege}/${userId}/iterations/${iterationId}/plans/tasks/${taskId}`);
  }

  public updatePlanTasks(userId: number, iterationId: number, request): Observable<any> {
    return this.http.patch(`${ApiConfig.protege}/${userId}/iterations/${iterationId}/plans/tasks/status`, request);
  }
}
