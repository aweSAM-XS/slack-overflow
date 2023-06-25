import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../interface';
import { url, headers } from './utils';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = `${url}/users`;
  private headers = headers;
  private http = inject(HttpClient);

  getUsers(pageSize: number, pageNumber: number): Observable<User[]> {
    const params = new HttpParams()
      .set('page_size', pageSize)
      .set('page_number', pageNumber);

    return this.http.get<User[]>(this.url, { headers: this.headers, params });
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`, { headers: this.headers });
  }
}
