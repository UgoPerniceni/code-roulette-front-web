import {User} from './User';

export class Message {
  text: string;
  user: User;

  constructor(text: string, user: User) {
    this.text = text;
    this.user = user;
  }

  public formatMessageToChat(): string {
    return this.user.userName + ' : ' + this.text;
  }

}
