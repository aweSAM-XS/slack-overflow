import { Question } from './../interface/index';
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

  getQuestions(pageSize: number, pageNumber: number): Observable<Question[]> {
    const params = new HttpParams()
      .set('page_size', pageSize)
      .set('page_number', pageNumber);
    return this.http.get<Question[]>(this.url, {
      headers: this.headers,
      params
    });
  }
}
