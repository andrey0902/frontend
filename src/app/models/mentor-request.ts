import {User} from './user.model';

export class MentorRequest {
  type: string;
  id: string;
  attributes: RequestAttributes;

  constructor(props) {
    this.type = props.type;
    this.id = props.id;
    this.attributes = new RequestAttributes(props.attributes);
  }

}

export class RequestAttributes {
  userId: number;
  text: string;
  user: User;

  constructor(props) {
    this.userId = props.user_id;
    this.text = props.text;
    this.user = new User(props.user);
  }
}

export class MentorRequestMap {
  [key: string ]: MentorRequest;
}
