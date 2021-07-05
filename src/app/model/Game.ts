import {Exercise} from './Exercise';
import {Chat} from './Chat';
import {UserInGame} from './UserInGame';
import {Compilation} from './Compilation';

export class Game {
  id: string;
  exercise: Exercise;
  chat: Chat;
  isGameOver: boolean;

  usersInGame: UserInGame[];
  compilations: Compilation[] = [];

  constructor(exercise: Exercise, usersInGame: UserInGame[], chat: Chat, isGameOver: boolean, compilations: Compilation[]) {
    this.exercise = exercise;
    this.usersInGame = usersInGame;
    this.isGameOver = isGameOver;

    if (chat) {
      this.chat = chat;
    }

    if (compilations !== undefined) {
      this.compilations = compilations;
    } else {
      this.compilations = [];
    }
  }
}
