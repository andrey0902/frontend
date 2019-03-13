import {environment} from 'src/environments/environment';

export class ApiConfig {
  public static base = environment.API_PATH;
  public static users = `${ApiConfig.base}/users`;
  public static mentors = `${ApiConfig.base}/mentors`;
  public static protege = `${ApiConfig.base}/protege`;
}
