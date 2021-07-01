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
  isInQueue: boolean;
  lobbyId: string;

  constructor(id: string, firstName: string, lastName: string, email: string, userName: string, password: string, birthDate: Date, elo: number, eloProblems: number, isInQueue: boolean, lobbyId: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userName = userName;
    this.password = password;
    this.birthDate = birthDate;
    this.elo = elo;
    this.eloProblems = eloProblems;
    this.isInQueue = isInQueue;
    this.lobbyId = lobbyId;
  }
}
