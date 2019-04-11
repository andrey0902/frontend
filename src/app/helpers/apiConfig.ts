import {environment} from 'src/environments/environment';

export class ApiConfig {
  public static base = environment.API_PATH;
  public static portalBase = environment.PORTAL_PATH;
  public static users = `${ApiConfig.base}/users`;
  public static mentors = `${ApiConfig.base}/mentors`;
  public static protege = `${ApiConfig.base}/protege`;
  public static trustboxMessages = `${ApiConfig.portalBase}/trust_box/messages/`;
  public static logout = `${ApiConfig.portalBase}/auth/logout/`;
  public static getAccessUserPortal = `${ApiConfig.portalBase}/mentoring/plans/check_available_idp/`;
}
