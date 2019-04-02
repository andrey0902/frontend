import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiConfig} from '../../../helpers/apiConfig';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrustboxService {

  constructor(private http: HttpClient) {
  }

  public getUnreadCountMessage() {
    return this.http.get(`${ApiConfig.trustboxMessages}`, {
      params: this.params({is_readed: 'False'})
    })
      .pipe(
        map((res: any) => res.count)
      );
  }

  /**
   * custom constructor for http params
   * @param options - object with option name and value
   */
  private params(options) {
    let params = new HttpParams();

    for (const option in options) {
      if (options.hasOwnProperty(option)) {
        params = params.append(option, options[option]);
      }
    }

    return params;
  }
}
