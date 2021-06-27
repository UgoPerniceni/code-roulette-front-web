import {User} from './User';

export class Lobby {
  id: string;
  title: string;
  createdAt: Date;
  users: User[];

  constructor(id: string, title: string, createdAt: Date, users: User[]) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.users = users;
  }
}
