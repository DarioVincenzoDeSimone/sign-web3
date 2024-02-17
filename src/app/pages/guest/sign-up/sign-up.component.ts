import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ISignUpDTO } from 'src/app/interfaces/ISignUp';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private _userService: UserService,
    private _toastService: ToastrService,
    private _router: Router
  ) {
    this.signupForm = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      businessName: fb.control('', [Validators.required]),
      name: fb.control('', [Validators.required]),
      surname: fb.control('', [Validators.required]),
      vatNumber: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required, Validators.minLength(4)]),
      passwordRepeat: fb.control('', [Validators.required, Validators.minLength(4)])
    },
      { validators: this.passwordMatchValidator('password', 'passwordRepeat') },)
  }

  signup() {
    let {passwordRepeat, email, ...signUpData} = this.signupForm.value;
    signUpData = {...signUpData, username: email}
    this._userService.signUp(signUpData as ISignUpDTO).pipe(first()).subscribe(
      success => {
        this._toastService.success('Registrazione effettuata correttamente', 'Successo');
        setTimeout(() => this._router.navigate(['/sign-in']), 2000);
      },
      error => {
        if(error && error?.message) return this._toastService.error(error.message, 'Errore')

        return this._toastService.error('Qualcosa è andato storto', 'Errore')
      }
    )
    console.log(signUpData);
  }


  passwordMatchValidator(formName1: string, formName2: string) {
    return (form: FormGroup) => {
      const error =
        form.get(formName1).value !== form.get(formName2).value
          ? { required: true }
          : null;
      form.get(formName2).setErrors(error); //<--see the setErrors
      return error;
    };
  }
}