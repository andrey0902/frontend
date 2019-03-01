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

  getMentors(params = {}) {
    return this.http.get(`${ApiConfig.mentors}`, { ...httpOptions,  params });
  }

  addMentor(mentor_id) {
    const params = { include: 'proteges' };
    return this.http.post(`${ApiConfig.mentors}/${mentor_id}`, {}, { ...httpOptions,  params });
  }

  deleteMentor(mentor_id) {
    return this.http.delete(`${ApiConfig.mentors}/${mentor_id}`, { ...httpOptions });
  }

  bindProtegeToMentor({ protegeId, mentorId }) {
    const params = { mentor: mentorId };
    return this.http.patch(`${ApiConfig.protege}/${protegeId}`, {}, { ...httpOptions, params });
  }

  // getNeedMentorUsers() {
  //   return this.http.get('assets/mockDB/users.json').pipe(
  //     map((users: User[]) => {
  //       return users.filter(user => !user.attributes.is_mentor);
  //     })
  //   );
  // }
  //
  // getBecomeMentorUsers() {
  //   return this.http.get('assets/mockDB/users.json').pipe(
  //     map((users: User[]) => {
  //       return users.filter(user => !!user.attributes.is_mentor);
  //     })
  //   );
  // }
}
