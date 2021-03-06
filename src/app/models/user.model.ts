import {MentorsHelper} from '../root-store/mentors/mentors.helper';
import {Specialization} from './specialization.model';
import { Iteration } from './iteration.model';

export class User {
  type: string;
  id: number;
  attributes: Attributes;
  iteration?: Iteration | boolean;

  constructor(data) {
    this.type = data.type;
    this.id = +data.id;
    this.attributes = new Attributes(data.attributes);
    this.iteration = false;
  }

  public patch(payload): User {
    this.attributes.patch(payload);
    return this;
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
  specialization: Specialization;
  mentor: User;
  proteges: UsersMap;
  needMentor: boolean;
  wantBeMentor: boolean;
  roles: string[] | null;

  constructor(data) {
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.photo = data.photo;
    this.photoThumbnail = data.photo_thumbnail;
    this.isMentor = data.is_mentor;
    this.portalId = +data.portal_id;
    this.slack = data.slack;
    this.specialization = data.specialization ? new Specialization(data.specialization) : null;
    this.mentor = data.mentor ? new User(data.mentor) : null;
    this.proteges = data.proteges ? MentorsHelper.createUsersMap(data.proteges) : {};
    this.needMentor = data.need_mentor;
    this.wantBeMentor = data.want_be_mentor;
    this.roles = data.roles ? data.roles : null;
  }

  get fullName() {
    return `${this.lastName} ${this.firstName}`;
  }

  patch(payload) {
    Object.assign(this, ...payload);
  }

}

export class UsersMap {
 [key: string ]: User;
}
