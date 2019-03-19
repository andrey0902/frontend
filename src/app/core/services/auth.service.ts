import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) {

    // TODO: Remove this in the future. This is a temporary solution
    // this.cookieService.set( 'ltp.token', 'ff8965c0409beff148494e884f699db0da115fd0' );
  }

  getAuthToken() {
    const authToken = this.cookieService.get('ltp.token');
    if (!authToken) {
      window.location.href = environment.redirectPath;
    }
    // TODO: Check if token exists and redirect to portal auth if doesn't
    return `Token ${authToken}`;
  }
}
