import {Language} from '../enum/Language';

export class Exercise {

  id: string;
  title: string;
  code: string;
  description: string;
  language: Language;
  updatedAt: Date;
  createdAt: Date;

  constructor(id: string, title: string, code: string, description: string, language: Language, updatedAt: Date, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.code = code;
    this.description = description;
    this.language = language;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}
