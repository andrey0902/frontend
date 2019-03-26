import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) {

    // TODO: Remove this in the future. This is a temporary solution
    this.cookieService.set( 'ltp.token', 'bd35ecff714989a11f0e089246769637b530ad05' );
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
