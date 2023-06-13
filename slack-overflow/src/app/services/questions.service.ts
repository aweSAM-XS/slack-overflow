import { Question } from './../interface/index';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private url = 'http://localhost:3000/questions';
  http = inject(HttpClient);

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url);
  }
}
