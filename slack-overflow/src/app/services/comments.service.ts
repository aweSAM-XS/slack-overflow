import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Comment } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private url = '../api/comments.json';
  http = inject(HttpClient);

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url);
  }

  getPostComments(id: string): Observable<Comment[] | undefined> {
    return this.getComments().pipe(
      map((comments: Comment[]) => comments.filter((c) => c.post_id === id))
    );
  }
}
