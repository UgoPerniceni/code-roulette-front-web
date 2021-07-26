import {User} from './User';

export class UserInGame {
  id: string;
  turn: number;
  current: boolean;
  score: number;
  won: boolean;
  forfeit: boolean;
  user: User;
  
  constructor(id: string, turn: number, current: boolean, score: number, won: boolean, forfeit: boolean, user: User) {
    this.id = id;
    this.turn = turn;
    this.current = current;
    this.score = score;
    this.won = won;
    this.forfeit = forfeit;
    this.user = user;
  }
}
