import {User, UsersMap} from '../../models/user.model';

export class MentorHelper {

  public  static createUsersMap(users) {
    const userList = {};
    users.forEach(user => {
      userList[user.id] = new User(user);
    });

    return userList;
  }

  public static deleteMentor(mentorList: UsersMap, id: string | number) {
    delete mentorList[id];
    return mentorList;
  }

  public static addProtege(mentorList: UsersMap, protege: User, mentorId: string) {
    const updatedList = MentorHelper.removeRelations(mentorList, protege.id);
    updatedList[mentorId].attributes.proteges = {
      ...updatedList[mentorId].attributes.proteges,
      [protege.id]: protege
    };
    return updatedList;
  }

  public static changeMentor(mentorList: UsersMap, protege: User, newMentorId: string, currentMentorId: string) {
    delete mentorList[currentMentorId].attributes.proteges[protege.id];
    mentorList[newMentorId].attributes.proteges = {
      ...mentorList[newMentorId].attributes.proteges,
      [protege.id]: protege
    };
    return mentorList;
  }

  public static deleteProtege(mentorList: UsersMap, protegeId: string, currentMentorId: string) {
    delete mentorList[currentMentorId].attributes.proteges[protegeId];
    return mentorList;
  }

  public static removeRelations(mentorList: UsersMap, protegeId: string) {
    for (const mentor of Object.values(mentorList)) {
      delete mentor.attributes.proteges[protegeId];
    }
    return mentorList;
  }
}
