import { Language } from '../enum/Language';
export class NewCode {
  title: string;
  code: string;
  tests: string[]
  description: string;
  language: Language;
  compilationOutput: string;
  compilationScore: number;
  status: string;


  constructor(title: string, code: string, description: string, language: Language, tests: string[],
    compilationOutput: string, compilationScore: number, status: string) {
    this.title = title;
    this.code = code;
    this.description = description;
    this.language = language;
    this.tests = tests;
    this.compilationOutput = compilationOutput;
    this.compilationScore = compilationScore;
    this.status = status;
  }
}
