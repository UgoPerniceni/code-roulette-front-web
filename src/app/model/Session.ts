export class Session {
  id: string;
  userId: string;
  token: string;

  constructor(id: string, userId: string, token: string) {
    this.id = id;
    this.userId = userId;
    this.token = token;
  }
}
