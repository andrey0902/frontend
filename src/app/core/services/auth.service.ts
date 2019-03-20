import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) {

    // TODO: Remove this in the future. This is a temporary solution
    // this.cookieService.set( 'ltp.token', '1320846a093c7604e93a4cc13bbc67eeedabb30f' );
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
