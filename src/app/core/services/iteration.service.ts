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
}
