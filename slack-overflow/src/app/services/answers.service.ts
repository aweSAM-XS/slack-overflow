import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url, headers } from './utils';
import { Answer, Success, User } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private url: string = url;
  private headers = headers;

  constructor(private http: HttpClient) {}

  addAnswer(questionId: string, answerBody: string): Observable<Success> {
    const payload = { answer_body: answerBody };
    return this.http.post<Success>(
      `${this.url}/answers/${questionId}`,
      payload,
      { headers: this.headers }
    );
  }

  getAnswersByQuestion(question_id: string): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.url}/answers/${question_id}`, {
      headers: this.headers,
    });
  }

  getAnswersByUser(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.url}/answers/user`, {
      headers: this.headers,
    });
  }

  acceptAnswer(question_id: string, answerId: string): Observable<Success> {
    const payload = { question_id };
    return this.http.post<Success>(
      `${this.url}/answers/accept/${answerId}`,
      payload,
      { headers: this.headers }
    );
  }

  deleteAnswer(answerId: string): Observable<Success> {
    return this.http.delete<Success>(`${this.url}/answers/delete/${answerId}`, {
      headers: this.headers,
    });
  }
}
