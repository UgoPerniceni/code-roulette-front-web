import {Queue} from './Queue';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  birthDate: Date;
  elo: number;
  elo_problems: number;
  queue: Queue;

  constructor(id: string, firstName: string, lastName: string, email: string, userName: string, password: string, birthDate: Date, elo: number, elo_problems: number, queue: Queue) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userName = userName;
    this.password = password;
    this.birthDate = birthDate;
    this.elo = elo;
    this.elo_problems = elo_problems;
    this.queue = queue;
  }
}
