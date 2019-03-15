import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) {

    // TODO: Remove this in the future. This is a temporary solution
    this.cookieService.set( 'ltp.token', '85305943029da9c1577bf7e3bfc1821b14085c8a' );
  }

  getAuthToken() {
    const authToken = this.cookieService.get('ltp.token');
    // TODO: Check if token exists and redirect to portal auth if doesn't
    return `Token ${authToken}`;
  }
}
