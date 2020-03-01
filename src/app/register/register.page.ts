import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { IonButton, IonInput, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validEmail: boolean = false;
  emailHelp: string = "This email is not a valid email";
  validUsername: boolean = false;
  usernameHelp: string = "Username must contain at least 6 characters";
  validPassword: boolean = false;
  passwordHelp: string = "Password must contain an uppercase, a number and at least eight characters";
  validConfirmPassword: boolean = false;
  confirmPasswordHelp: string = "Password must contain an uppercase, a number and at least eight characters";
  helpMessage: string = "";

  email: string;
  username: string;
  password: string;
  confirmPassword: string;

  @ViewChildren(IonInput) inputs: any;
  @ViewChild(IonButton, { static: false }) loginButton: IonButton;

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private router: Router,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    // IF THERES STILL A SESSION, SEND USER TO HOME
    if (await this.storage.get("access_token") != "") {
      this.router.navigate(['/home']);
    }
  }

  async register() {
    let message: string;

    if (this.email && this.username && this.password && this.confirmPassword) {

      if (this.password == this.confirmPassword) {
        let res: any = await this.authService.registerUser({
          email: this.email,
          username: this.username,
          password: this.password
        });
        console.log(res);

        if (res.status == 201) {
          message = "User registered successfully"
        } else if (res.status == 409) {
          message = "Error: User already exists"
        }

        let toast = await this.toastController.create({
          message: message,
          duration: 2000
        });

        toast.present();
      }
    }
  }

  checkRegex(value: string, pattern: string) {
    let matching = "" + value.match(pattern);

    if (matching != "null") {
      return true;
    }
  }

  checkAllRegex() {

    // EMAIL REGEX
    if (this.checkRegex(this.inputs._results[0].value, "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]{1,}")) {
      this.validEmail = true;
    } else {
      this.validEmail = false;
    }

    // USERNAME REGEX
    if (this.checkRegex(this.inputs._results[1].value, "[a-zA-Z0-9-_.]{6,30}$")) {
      this.validUsername = true;
    } else {
      this.validUsername = false;
    }

    // PASSWORD REGEX
    if (this.checkRegex(this.inputs._results[2].value, "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")) {
      this.validPassword = true;
      if (!this.passwordMatches()) {
        this.passwordHelp = "Both passwords don't match"
      } else {
        this.passwordHelp = ""
      }
    } else {
      this.validPassword = false;
      this.passwordHelp = "Password must contain an uppercase, a number and at least eight characters"
    }

    // CONFIRM PASSWORD REGEX
    if (this.checkRegex(this.inputs._results[3].value, "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")) {
      this.validConfirmPassword = true;
      if (!this.passwordMatches()) {
        this.confirmPasswordHelp = "Both passwords don't match"
      } else {
        this.confirmPasswordHelp = ""
      }
    } else {
      this.validConfirmPassword = false;
      this.confirmPasswordHelp = "Password must contain an uppercase, a number and at least eight characters"
    }

    if (this.validEmail && this.validUsername &&
      this.validPassword && this.validConfirmPassword) {
      if (this.passwordMatches()) {
        this.loginButton.disabled = false;
      } else {
        this.loginButton.disabled = true;
      }
    } else {
      this.loginButton.disabled = true;
    }

  }

  passwordMatches() {
    if (this.inputs._results[2].value != this.inputs._results[3].value) {
      return false;
    }
    return true;
  }

}
