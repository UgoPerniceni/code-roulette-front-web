import {Exercise} from './Exercise';
import {User} from './User';

export class Game {
  id: string;
  exercise: Exercise;
  users: User[];

  constructor(exercise: Exercise, users: User[]) {
    this.exercise = exercise;
    this.users = users;
  }
}
