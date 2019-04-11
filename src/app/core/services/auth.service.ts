import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {CookieStorageService} from './cookie-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieStorageService) {

    // TODO: Remove this in the future. This is a temporary solution
     this.cookieService.token = '2c5c302fd542f352fd39602a75a4fb3e76c0520f';
  }

  getAuthToken() {
    const authToken = this.cookieService.token;
    if (!authToken) {
      window.location.href = environment.redirectPath;
    }
    // TODO: Check if token exists and redirect to portal auth if doesn't
    return `Token ${authToken}`;
  }
}
