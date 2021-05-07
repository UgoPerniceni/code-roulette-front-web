export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  birthDate: Date;

  constructor(id: string, firstName: string, lastName: string, email: string, userName: string, password: string, birthDate: Date) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userName = userName;
    this.password = password;
    this.birthDate = birthDate;
  }
}
