import {CookieService} from 'ngx-cookie-service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor(private cookie: CookieService) {
  }

  public get token(): string {
    return this.cookie.get('ltp.token');
  }

  public set token(token: string) {
    this.cookie.set('ltp.token', token);
  }


  public get permissions() {
    const permissions = this.cookie.get('ltp.permissions');
    return permissions ? JSON.parse(permissions) : ["read_trust_box"];
  }
}
