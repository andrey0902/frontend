import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConfig} from '../../helpers/apiConfig';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserPortalIDP } from '../../shared/header/shared/models/userPortalIDP';

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

  getCurrentUser() {
    return this.http.get(`${ApiConfig.users}/current`, { params: { include: 'proteges,mentor'} });
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
    const params = { mentor: mentorId || '' };
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

  createMentorRequest(user_id, text) {
    return this.http.post(`${ApiConfig.mentors}/requests`, { user_id, text });
  }

  deleteMentorRequest(requestId) {
    return this.http.delete(`${ApiConfig.mentors}/requests/${requestId}`);
  }

  createProtegeRequest(user_id, text) {
    return this.http.post(`${ApiConfig.protege}/requests`, { user_id, text });
  }

  getUserPortalAccesse(): Observable<UserPortalIDP> {
    return this.http.get(ApiConfig.getAccessUserPortal)
      .pipe(
        map((response: any) => new UserPortalIDP(response))
      );
  }
}
