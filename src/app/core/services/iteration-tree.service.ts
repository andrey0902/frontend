import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiConfig} from '../../helpers/apiConfig';
import {ItemNode} from '../../shared/tree/models/item-node.model';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})

export class IterationTreeService {

  constructor(private http: HttpClient) { }

  public deleteTreeItem(item: ItemNode, protegeId: number, iterationId: number): Observable<any> {
    console.log('delete item');
    return this.http.delete(`${ApiConfig.protege}/${protegeId}/iterations/${iterationId}/plans/tasks/${item.id}`, { ...httpOptions });
  }

  public createTreeItem(item: ItemNode, protegeId: number, iterationId: number): Observable<any> {
    console.log('create item');
    const request = {
      order: item.order,
      text: item.text,
      is_completed: item.is_completed,
      parent_task_id: item.parentId
    };
    return this.http.post(`${ApiConfig.protege}/${protegeId}/iterations/${iterationId}/plans/tasks`, request, { ...httpOptions });
  }

  public editTreeItem(item: ItemNode, protegeId: number, iterationId: number): Observable<any> {
    console.log('edit item');
    return this.http.patch(`${ApiConfig.protege}/${protegeId}/iterations/${iterationId}/plans/tasks/${item.id}`, item, { ...httpOptions });
  }

  public updateTreeItems(items: number[], status: boolean, protegeId: number, iterationId: number): Observable<any> {
    console.log('update item');
    console.log(items);
    const request = {
      ids: items,
      is_completed: status
    };
    return this.http.patch(`${ApiConfig.protege}/${protegeId}/iterations/${iterationId}/plans/tasks/status`, request, { ...httpOptions });
  }
}
