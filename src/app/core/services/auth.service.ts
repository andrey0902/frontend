import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) {

    // TODO: Remove this in the future. This is a temporary solution
    // this.cookieService.set( 'ltp.token', 'ffa314820549a0222613abfed3dcf1aa1c8709a6' );
  }

  getAuthToken() {
    const authToken = this.cookieService.get('ltp.token');
    // TODO: Check if token exists and redirect to portal auth if doesn't
    return `Token ${authToken}`;
  }
}
