import {User} from './User';

export class UserInGame {
  id: string;
  user: User;

  constructor(id: string, user: User) {
    this.id = id;
    this.user = user;
  }
}
