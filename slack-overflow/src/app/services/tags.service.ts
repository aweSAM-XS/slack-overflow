import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private url = 'http://localhost:3000/tags';
  http = inject(HttpClient)


  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.url);
  }
}
