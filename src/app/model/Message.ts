import {User} from './User';

export class Message {
  text: string;
  type: string;
  user: User;

  constructor(text: string, type: string, user: User) {
    this.text = text;
    this.type = type;
    this.user = user;
  }
}
