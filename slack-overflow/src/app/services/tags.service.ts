import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../interface';
import { url, headers } from './utils';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private url = `${url}/tags`;
  private headers = headers

  http = inject(HttpClient);

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.url, { headers: this.headers });
  }

  getTag(tag_name: string) {
    return this.http.get<Tag>(`${this.url}/${tag_name}`, { headers: this.headers })
  }
}
