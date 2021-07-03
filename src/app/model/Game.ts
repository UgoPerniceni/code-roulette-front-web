import {Exercise} from './Exercise';
import {Chat} from './Chat';
import {UserInGame} from './UserInGame';

export class Game {
  id: string;
  exercise: Exercise;
  chat: Chat;
  isGameOver: boolean;

  usersInGame: UserInGame[];

  constructor(exercise: Exercise, usersInGame: UserInGame[], chat: Chat, isGameOver: boolean) {
    this.exercise = exercise;
    this.usersInGame = usersInGame;
    if (chat) {
      this.chat = chat;
    }
    this.isGameOver = isGameOver;
  }
}
