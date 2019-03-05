import {MentorHelper} from '../root-store/mentors/mentor.helper';

export class User {
  type: string;
  id: string;
  attributes: Attributes;
  constructor(data) {
    this.type = data.type;
    this.id = data.id;
    this.attributes = new Attributes(data.attributes);
  }
}

export class Attributes {
  firstName: string;
  lastName: string;
  photo: string;
  photoThumbnail: string;
  isMentor: boolean;
  portalId: number;
  slack: string;
  specializationId: number;
  proteges: UsersMap;
  // need_mentor?: boolean;
  // want_be_mentor?: boolean;
  constructor(data) {
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.photo = data.photo;
    this.photoThumbnail = data.photo_thumbnail;
    this.isMentor = data.is_mentor;
    this.portalId = data.portal_id;
    this.slack = data.slack;
    this.specializationId = data.specializtion_id;
    this.proteges = data.proteges ? MentorHelper.createUsersMap(data.proteges) : {};
  }

  prepareProtege(data: any[]) {
    return data.map(protege => new User(protege));
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export class UsersMap {
 [key: string ]: User;
}
