import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/actions/authActions';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signUp() {
    if (this.signupForm.invalid) {
      return;
    }
    console.log(this.signupForm.value);
    const { firstName, username, email, password } = this.signupForm.value;
    const payload = { firstName, username, email, password };
    console.log(payload)
    this.store.dispatch(AuthActions.signUp({ payload }));
  }
}