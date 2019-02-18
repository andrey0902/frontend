import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.http.get<User>('assets/mockDB/currentUser.json');
  }

  getNeedMentorUsers() {
    return this.http.get('assets/mockDB/users.json').pipe(
      map((users: User[]) => {
        return users.filter(user => !!user.needMentor);
      })
    );
  }

  getBecomeMentorUsers() {
    return this.http.get('assets/mockDB/users.json').pipe(
      map((users: User[]) => {
        return users.filter(user => !!user.wantToBeMentor);
      })
    );
  }
}
