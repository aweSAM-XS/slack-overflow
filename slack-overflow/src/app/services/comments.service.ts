import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Comment } from '../interface';
import { url } from './utils';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private url = `${url}/comments`;
  http = inject(HttpClient);

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url);
  }

  getAnswerComments(id: string): Observable<Comment[] | undefined> {
    return this.getComments().pipe(
      map((comments: Comment[]) => comments.filter((c) => c.post_id === id))
    );
  }
}
