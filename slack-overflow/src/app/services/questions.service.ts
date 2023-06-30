import { NewQuestion, Question, Success } from './../interface/index';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { url, headers } from './utils';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private url = `${url}/questions`;
  private headers = headers;
  http = inject(HttpClient);

  addQuestion(question: NewQuestion): Observable<Success> {
    return this.http.post<Success>(`${this.url}/ask`, question, {
      headers: this.headers,
    });
  }

  getQuestions(pageSize: number, pageNumber: number): Observable<Question[]> {
    const params = new HttpParams()
      .set('page_size', pageSize)
      .set('page_number', pageNumber);
    return this.http.get<Question[]>(this.url, {
      headers: this.headers,
      params,
    });
  }

  getQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.url}/${id}`, {
      headers: this.headers,
    });
  }

  getQuestionsByTagName(tag_name: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.url}/tag/${tag_name}`, {
      headers: this.headers,
    });
  }
}
