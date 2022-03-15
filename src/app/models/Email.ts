export class Email {
  private readonly name: string;
  private readonly email: string;
  private readonly subject: string;
  private readonly message: string;

  constructor(name: string, email: string, subject: string, message: string) {
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
  }

}
