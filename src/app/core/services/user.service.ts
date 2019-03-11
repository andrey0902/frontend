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
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(params = {}) {
    return this.http.get(`${ApiConfig.users}`, { ...httpOptions,  params });
  }

  getUser(userId, params = {}) {
    return this.http.get(`${ApiConfig.users}/${userId}`, { ...httpOptions, params });
  }

  getMentors(params = {}) {
    return this.http.get(`${ApiConfig.mentors}`, { ...httpOptions,  params });
  }

  addMentor(mentor_id, params = {}) {
    return this.http.post(`${ApiConfig.mentors}/${mentor_id}`, {}, { ...httpOptions,  params });
  }

  deleteMentor(mentor_id) {
    return this.http.delete(`${ApiConfig.mentors}/${mentor_id}`, { ...httpOptions });
  }

  bindProtegeToMentor({ protegeId, mentorId }) {
    const params = { mentor: mentorId };
    return this.http.patch(`${ApiConfig.protege}/${protegeId}`, {}, { ...httpOptions, params });
  }

  getNeedMentorRequests() {
    const params = { include: 'user'};
    return this.http.get(`${ApiConfig.protege}/requests`, { ...httpOptions, params });
  }

  deleteProtegeRequest(requestId) {
    return this.http.delete(`${ApiConfig.protege}/requests/${requestId}`, { ...httpOptions });
  }

  getBecomeMentorUsers() {
    const params = { include: 'user'};
    return this.http.get(`${ApiConfig.mentors}/requests`, { ...httpOptions, params });
  }

  deleteMentorRequest(requestId) {
    return this.http.delete(`${ApiConfig.mentors}/requests/${requestId}`, { ...httpOptions });
  }
}
