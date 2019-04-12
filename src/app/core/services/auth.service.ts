import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {CookieStorageService} from './cookie-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieStorageService) {

    // TODO: Remove this in the future. This is a temporary solution
    // this.cookieService.token = 'd41aa712ffbb1bb97a1b46be347aeed50fb0b2e4';
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
