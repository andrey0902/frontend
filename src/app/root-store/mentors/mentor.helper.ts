import {User} from '../../models/user.model';

export class MentorHelper {
  public static deleteMentor(mentorList: User[], id: string | number) {
    return mentorList.filter(mentor => mentor.id !== id);
  }
}
