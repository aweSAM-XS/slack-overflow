import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthSuccess, UserSignIn, UserSignUp } from '../interface';

@Injectable()
export class AuthService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/users';
  token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY1NjQ5YzJlLWE0YmYtNGQyYi1iNTU0LWRjYmVlODEwYTU2ZSIsImVtYWlsIjoiY2hhbmRsZXJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiYXBwcm92ZWQiOmZhbHNlLCJpYXQiOjE2ODQ0MzkwNDYsImV4cCI6MTY4NDQ0MjY0Nn0.RaKod1C_yAsMRYT_hUZgdKb_BTQlxY3BbL2LFqfM2cg';

  signUp(payload: UserSignUp): Observable<UserAuthSuccess> {
    localStorage.setItem('token', this.token);
    localStorage.setItem('payload', JSON.stringify(payload.firstName));
    return this.http.post<UserAuthSuccess>(this.url, payload);
  }

  signIn(payload: UserSignIn): Observable<UserAuthSuccess> {
    localStorage.setItem('token', this.token);
    localStorage.setItem('payload', JSON.stringify(payload.email));
    return this.http.post<UserAuthSuccess>(this.url, payload);
  }

  isSignedIn() {
    let token = localStorage.getItem('token');
    return token ? true : false;
  }
}
