import {Exercise} from './Exercise';
import {Chat} from './Chat';
import {UserInGame} from './UserInGame';
import {Compilation} from './Compilation';

export class Game {
  id: string;
  exercise: Exercise;
  chat: Chat;
  gameOver: boolean;
  code: string;
  timer: number;
  numberOfTurn: number;

  usersInGame: UserInGame[];
  compilations: Compilation[] = [];

  constructor(exercise: Exercise, usersInGame: UserInGame[], chat: Chat, gameOver: boolean, code: string, timer: number, numberOfTurn: number, compilations: Compilation[]) {
    this.exercise = exercise;
    this.usersInGame = usersInGame;
    this.gameOver = gameOver;
    this.code = code;
    this.timer = timer;
    this.numberOfTurn = numberOfTurn;

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

export class GameDto {
  id: string;
  usersInGame: UserInGame[];

  constructor(usersInGame: UserInGame[]) {
    this.usersInGame = usersInGame;
  }
}

