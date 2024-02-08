import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(
    fb: FormBuilder
  ) {
    this.signupForm = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      companyName: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required, Validators.minLength(4)]),
      passwordRepeat: fb.control('', [Validators.required, Validators.minLength(4)])
    },
      { validators: this.passwordMatchValidator('password', 'passwordRepeat') },)
  }

  signup() {
    console.log(this.signupForm);
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