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

  constructor(id: string, firstName: string, lastName: string, email: string, userName: string, password: string, elo: number, elo_problems: number, birthDate: Date) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userName = userName;
    this.password = password;
    this.elo = elo;
    this.elo_problems = elo_problems;
    this.birthDate = birthDate;
  }
}
