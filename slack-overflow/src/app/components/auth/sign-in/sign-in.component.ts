import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/actions/authActions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  store = inject(Store<AppState>);
  signInForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  forgot = false;
  emailSent = false;
  errorMessage$!: Observable<string>;

  ngOnInit() {
    let payload = localStorage.getItem('payload');
    if (payload) {
      this.router.navigate(['']);
    }
    this.forgot = false;
    this.emailSent = false;
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.forgotPasswordForm = this.formBuilder.group({
      forgotPasswordEmail: ['', [Validators.required, Validators.email]],
    });
  }

  signIn() {
    if (this.signInForm.invalid) {
      return;
    }
    const { email, password } = this.signInForm.value;
    const payload = { email, password };
    this.store.dispatch(AuthActions.signIn({ payload }));

    this.errorMessage$ = this.store.select((state) => {
      return state.auth.error;
    }) as Observable<string>;
  }

  hasForgotten() {
    this.forgot = !this.forgot;
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.emailSent = true;
    }
  }

  backToSignIn() {
    this.emailSent = false;
    this.forgot = false;
  }
}
