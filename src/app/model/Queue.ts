export class Queue {
  id: string;
  createdAt: Date;

  constructor(id: string, createdAt: Date) {
    this.id = id;
    this.createdAt = createdAt;
  }
}
