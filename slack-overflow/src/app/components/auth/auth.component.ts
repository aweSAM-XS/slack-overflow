import { Component } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [CommonModule, RouterModule, SignUpComponent, SignInComponent],
})
export class AuthComponent {

}
