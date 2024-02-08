import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MagicService } from 'src/services/magic.service';

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
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [Validators.required, Validators.minLength(4)])
    })
  }


  async login() {
    if (this.loginForm.valid) {
      await this.magicService.magic.auth.loginWithEmailOTP({ email: this.loginForm.get('email').value });
      let isLogged = await this.magicService.magic.user.isLoggedIn();
      if (isLogged) {
        this.router.navigate(['home']);
      } else {
        console.error('errore');
      }
    }
  }
}
