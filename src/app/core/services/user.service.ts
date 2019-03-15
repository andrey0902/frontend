import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConfig} from '../../helpers/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(params = {}) {
    return this.http.get(`${ApiConfig.users}`, { params });
  }

  getUser(userId, params = {}) {
    return this.http.get(`${ApiConfig.users}/${userId}`, { params });
  }

  getMentors(params = {}) {
    return this.http.get(`${ApiConfig.mentors}`, { params });
  }

  addMentor(mentor_id, params = {}) {
    return this.http.post(`${ApiConfig.mentors}/${mentor_id}`, {}, { params });
  }

  deleteMentor(mentor_id) {
    return this.http.delete(`${ApiConfig.mentors}/${mentor_id}`);
  }

  bindProtegeToMentor({ protegeId, mentorId }) {
    const params = { mentor: mentorId };
    return this.http.patch(`${ApiConfig.protege}/${protegeId}`, {}, { params });
  }

  getNeedMentorRequests() {
    const params = { include: 'user'};
    return this.http.get(`${ApiConfig.protege}/requests`, { params });
  }

  deleteProtegeRequest(requestId) {
    return this.http.delete(`${ApiConfig.protege}/requests/${requestId}`);
  }

  getBecomeMentorUsers() {
    const params = { include: 'user'};
    return this.http.get(`${ApiConfig.mentors}/requests`, { params });
  }

  deleteMentorRequest(requestId) {
    return this.http.delete(`${ApiConfig.mentors}/requests/${requestId}`);
  }
}
