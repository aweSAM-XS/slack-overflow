import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthSuccess, UserSignIn, UserSignUp } from '../interface';
import { url } from './utils';

@Injectable()
export class AuthService {
  // private http = inject(HttpClient);
  private url = `${url}/users`;

  
  constructor(private http: HttpClient) { }

  signUp(payload: UserSignUp): Observable<UserAuthSuccess> {
    return this.http.post<UserAuthSuccess>(this.url, payload);
  }

  signIn(payload: UserSignIn): Observable<UserAuthSuccess> {
    return this.http.post<UserAuthSuccess>(`${this.url}/login`, payload);
  }

  isSignedIn() {
    let token = localStorage.getItem('token');
    return token ? true : false;
  }
}
