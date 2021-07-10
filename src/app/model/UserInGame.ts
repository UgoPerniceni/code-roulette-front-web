import {User} from './User';

export class UserInGame {
  id: string;
  turn: number;
  current: boolean;
  score: number;
  user: User;

  constructor(id: string, turn: number, current: boolean, score: number, user: User) {
    this.id = id;
    this.turn = turn;
    this.current = current;
    this.score = score;
    this.user = user;
  }
}
