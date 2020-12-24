import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('login') loginForm: NgForm;
  user = { email: '', password: '', returnSecureToken: true };
  errorMsg: string;
  email: string = 'common@milk.com';
  constructor(private uerService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    this.user.email = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;

    this.uerService.authenticateUser(this.user).subscribe(
      (res: Response) => {
        this.errorMsg = null;
        this.router.navigate(['']);
      },
      (error) => {
        console.table(error.error.error.message);
        switch (error.error.error.message) {
          case 'EMAIL_NOT_FOUND': {
            this.errorMsg = 'Incorrect email provided!';
            break;
          }
          case 'INVALID_PASSWORD': {
            this.errorMsg = 'Incorrect password provided!';
            break;
          }
          case 'USER_DISABLED': {
            this.errorMsg =
              'Your account is disabled! Please contact administrator';
            break;
          }
          default: {
            this.errorMsg = 'Unknown error occured';
            break;
          }
        }
      }
    );

    //remove the error mesage from the login screen after 5 seconds
    setTimeout(() => {
      this.errorMsg = null;
    }, 5000);
  }

  onHandleError() {
    this.errorMsg = null;
  }
}
