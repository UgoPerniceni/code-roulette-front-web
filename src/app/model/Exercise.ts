export class Exercise {
  id: string;
  title: string;
  code: string;
  updatedAt: Date;
  createdAt: Date;

  constructor(id: string, title: string, code: string, updatedAt: Date, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.code = code;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}
