import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {CookieStorageService} from './cookie-storage.service';
import {HttpClient} from '@angular/common/http';
import {ApiConfig} from '../../helpers/apiConfig';
import {tap} from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieStorageService, private http: HttpClient) {

    // TODO: Remove this in the future. This is a temporary solution
     this.cookieService.token = '9330fd96f54d179ad2dab978398c4e53cf0174f2';
  }

  getAuthToken() {
    const authToken = this.cookieService.token;
    if (!authToken) {
      window.location.href = environment.redirectPath;
    }
    // TODO: Check if token exists and redirect to portal auth if doesn't
    return `Token ${authToken}`;
  }

  logout() {
    return this.http.post(ApiConfig.logout, '')
      .pipe(
        tap((res) => this.cookieService.clear())
      );
  }
}
