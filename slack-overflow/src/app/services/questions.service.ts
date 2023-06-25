import { Question } from './../interface/index';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private url = 'http://localhost:3000/questions';
  http = inject(HttpClient);

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url);
  }

  getQuestion(id: string): Observable<Question | undefined> {
    return this.getQuestions().pipe(
      map((questions) =>
        questions.find((q) => Number(q.question_id) === Number(id))
      )
    );
  }
}
