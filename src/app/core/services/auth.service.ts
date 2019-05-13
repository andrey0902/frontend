import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {CookieStorageService} from './cookie-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieStorageService) {

    // TODO: Remove this in the future. This is a temporary solution
    // this.cookieService.token = '2a72a610b6ff740f7f1560701d8bd45659295c9c';
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
