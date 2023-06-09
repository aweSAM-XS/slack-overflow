import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthSuccess, UserSignIn, UserSignUp } from '../interface';

@Injectable()
export class AuthService {
  private http = inject(HttpClient);

  signUp(payload: UserSignUp): Observable<UserAuthSuccess> {
    return this.http.post<UserAuthSuccess>(
      'http://localhost:6900/users',
      payload
    );
  }

  signIn(payload: UserSignIn): Observable<UserAuthSuccess> {
    return this.http.post<UserAuthSuccess>(
      'http://localhost:6900/users/login',
      payload
    );
  }

  isSignedIn() {
    let token = localStorage.getItem('token');
    return token ? true : false;
  }
}
