import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, from, pipe, switchMap, tap } from 'rxjs';
import { ISignInDTO } from 'src/app/interfaces/ISignUp';
import { MagicService } from 'src/services/magic.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  loginForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private magicService: MagicService,
    private router: Router,
    private _userService: UserService
  ) {
    this.loginForm = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [Validators.required, Validators.minLength(4)])
    })
  }


  async login() {
    if (this.loginForm.valid) {
      let signInData: ISignInDTO = {
        username: this.loginForm.value['email'],
        password: this.loginForm.value['password']
      }
      this._userService.signIn(signInData)
      .pipe(
        switchMap(_ => {return from(this.magicService.magic.auth.loginWithEmailOTP({ email: this.loginForm.get('email').value }))}),
        switchMap(_ => {return from(this.magicService.magic.user.isLoggedIn())})
      ).subscribe(
        isLoggedIn => {
          if (isLoggedIn){
            this.router.navigate(['home']);
          }else{
            console.error('Errore durante il login');
          }

        }
      )
    }else{
      console.log('Form non valido')
    }
  }
}
