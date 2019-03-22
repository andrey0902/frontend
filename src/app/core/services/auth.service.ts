import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) {

    // TODO: Remove this in the future. This is a temporary solution
  //  this.cookieService.set( 'ltp.token', 'd5f9730a7adc7b81d60977808d840a5ca667151b' );
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
