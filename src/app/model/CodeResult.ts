export class CodeResult {
  outputConsole: string;
  status: string;
  userId: string;

  constructor(outputConsole: string, status: string, userId: string) {
    this.outputConsole = outputConsole;
    this.status = status;
    this.userId = userId;
  }
}
