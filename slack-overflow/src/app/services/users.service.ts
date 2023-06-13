import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = 'http://localhost:3000/users';
  private http = inject(HttpClient)

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(id: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map((users: User[]) => users.find((u) => u.user_id === id))
    );
  }
}
