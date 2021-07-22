import {Role} from '../enum/Role';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  birthDate: Date;
  elo: number;
  eloProblems: number;
  inQueue: boolean;
  lobbyId: string;
  gamesPlayed: number;
  gamesWon: number;
  correctCompilation: number;

  role: Role;

  constructor(id: string, firstName: string, lastName: string, email: string, userName: string, password: string, birthDate: Date, elo: number, eloProblems: number, inQueue: boolean, lobbyId: string,
              gamesPlayed: number, gamesWon: number, correctcompilation: number, role: Role) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userName = userName;
    this.password = password;
    this.birthDate = birthDate;
    this.elo = elo;
    this.eloProblems = eloProblems;
    this.inQueue = inQueue;
    this.lobbyId = lobbyId;
    this.gamesPlayed = gamesPlayed;
    this.gamesWon = gamesWon;
    this.correctCompilation = correctcompilation;

    this.role = role;
  }
}
