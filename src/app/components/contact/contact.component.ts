import { Component, OnInit } from '@angular/core';
import {Email} from '../../../assets/js/smtp';
import {environment} from '../../../environments/environment';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  emailStatus: boolean;
  emailStatusMessage: string = null;
  isLoading = false;
  emailFormGroup = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      subject: [null, [Validators.required, Validators.minLength(8)]],
      message: [null, Validators.required]
    }
  );

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  validateFormControl(fcName: string): boolean {
    return this.emailFormGroup.get(fcName).invalid && (this.emailFormGroup.get(fcName).dirty || this.emailFormGroup.get(fcName).touched);
  }

  sendEmail(): void {
    this.isLoading = true;
    // const email = new Email(
    //   this.emailFormGroup.get('name').value,
    //   this.emailFormGroup.get('email').value,
    //   this.emailFormGroup.get('subject').value,
    //   this.emailFormGroup.get('message').value,
    // );

    // Via SmtpJS
    Email.send({
      Host: environment.host,
      Username: environment.username,
      Password: environment.elastic_mail_password,
      To: environment.username,
      From: environment.username,
      Subject: this.emailFormGroup.get('subject').value,
      Body: `
            <b>Name: </b>${this.emailFormGroup.get('name').value} <br/>
            <b>Email: </b>${this.emailFormGroup.get('email').value}<br />
            <b>Subject: </b>${this.emailFormGroup.get('subject').value}<br />
            <b>Message:</b> <br /> ${this.emailFormGroup.get('message').value} <br><br>
            <i>This is sent as a feedback from my portfolio website</i><br/><br/>
            <b>~End of Message.~</b>`
    }).then(() => {
      this.isLoading = false;
      this.emailFormGroup.reset();
      this.emailStatusMessage = 'Your email has been sent. Thank you for your feedback!';
      setTimeout(() => this.emailStatusMessage = null, 2500);
    });
  }

}
