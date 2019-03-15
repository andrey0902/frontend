import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiConfig} from '../../helpers/apiConfig';
import {ItemNode} from '../../shared/tree/models/item-node.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IterationTaskModel} from '../../personal-plan/shared/models/iteration-plan.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Token 14119a9241b7432e424ee0d7b2ab75772663d259'
  })
};

@Injectable({
  providedIn: 'root'
})

export class IterationTreeService {

  constructor(private http: HttpClient) {
  }

  public getTree(iterationId: number, protegeId: number): Observable<IterationTaskModel[]> {
    return this.http.get(`${ApiConfig.protege}/${protegeId}/iterations/${iterationId}/plans/tasks`, {...httpOptions})
      .pipe(
        map((tasks: any[]) => {
          const plan: IterationTaskModel[] = [];
          tasks.forEach((task) => plan.push(new IterationTaskModel(task)));
          return plan;
        })
      );
  }

  public deleteTreeItem(item: ItemNode, protegeId: number, iterationId: number): Observable<any> {
    return this.http.delete(`${ApiConfig.protege}/${protegeId}/iterations/${iterationId}/plans/tasks/${item.id}`, {...httpOptions});
  }

  public createTreeItem(item: ItemNode, protegeId: number, iterationId: number): Observable<any> {
    const request = {
      order: item.order,
      text: item.text || '',
      is_completed: item.is_completed,
      parent_task_id: item.parentId
    };
    return this.http.post(`${ApiConfig.protege}/${protegeId}/iterations/${iterationId}/plans/tasks`, request, {...httpOptions});
  }

  public editTreeItem(item: ItemNode, protegeId: number, iterationId: number): Observable<any> {
    const request = {
      order: item.order,
      text: item.text || '',
      is_completed: item.is_completed,
      parent_task_id: item.parentId
    };
    return this.http.patch(`${ApiConfig.protege}/${protegeId}/iterations/${iterationId}/plans/tasks/${item.id}`, request, {...httpOptions});
  }

  public updateTreeItems(items: number[], status: boolean, protegeId: number, iterationId: number): Observable<any> {
    const request = {
      id: items,
      is_completed: status
    };
    return this.http.patch(`${ApiConfig.protege}/${protegeId}/iterations/${iterationId}/plans/tasks/status`, request, {...httpOptions});
  }
}
