import {Exercise} from './Exercise';
import {User} from './User';

export class Compilation {
  id: string;
  input: string;
  output: string;
  status: string;
  score: string;

  exercise: Exercise;

  user: User;

  compiledAt: Date;
  updatedAt: Date;
  createdAt: Date;

  constructor(id: string, input: string, output: string, status: string, exercise: Exercise, user: User, score: string, compiledAt: Date, updatedAt: Date, createdAt: Date) {
    this.id = id;
    this.input = input;
    this.output = output;
    this.status = status;
    this.score = score;
    this.exercise = exercise;
    this.user = user;
    this.compiledAt = compiledAt;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}
