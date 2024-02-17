import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private _userService: UserService,
    private _toastService: ToastrService
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
        tap((response, ) => {
          if(response && response?.token){
            this._userService.setAuthToken(response.token)
          }
        }),
        switchMap(_ => {return from(this.magicService.magic.auth.loginWithEmailOTP({ email: this.loginForm.get('email').value }))}),
        switchMap(_ => {return from(this.magicService.magic.user.isLoggedIn())})
      ).subscribe(
        isLoggedIn => {
          if (isLoggedIn){
            this._toastService.success('Login effettuato correttamente', 'Successo');
            setTimeout(() => this.router.navigate(['home']), 2000)
          }else{
            this._toastService.success('Qualcosa è andato storto', 'Errore');
          }

        }
      )
    }else{
      console.log('Form non valido')
    }
  }
}
