import {Exercise} from './Exercise';
import {User} from './User';
import {Chat} from './Chat';

export class Game {
  id: string;
  exercise: Exercise;
  chat: Chat;

  users: User[];

  constructor(exercise: Exercise, users: User[], chat: Chat) {
    this.exercise = exercise;
    this.users = users;
    if (chat) {
      this.chat = chat;
    }
  }
}
