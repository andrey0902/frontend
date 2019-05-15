import {MentorRequest, MentorRequestMap} from '../../models/mentor-request';

export class MentorRequestsHelper {

  public static createRequestMap(requests) {
    const requestList = {};
    requests.forEach(request => {
      requestList[request.id] = new MentorRequest(request);
    });
    return requestList;
  }

  public static deleteRequest(requestList: MentorRequestMap, id: number) {
    delete requestList[id];
    return requestList;
  }

}
