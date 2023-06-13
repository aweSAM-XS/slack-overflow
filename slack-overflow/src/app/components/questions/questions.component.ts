import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from 'src/app/interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getQuestions } from 'src/app/store/actions/questionActions';
import { QuestionsService } from 'src/app/services/questions.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  store = inject(Store<AppState>);
  questionsService = inject(QuestionsService);
  questions$!: Observable<Question[]>;
  questions!: Question[];
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.loadQuestions();
    this.loading$ = this.store.select((state) => state.questions.loading);
    this.error$ = this.store.select((state) => state.questions.error);
  }

  loadQuestions() {
    this.store.dispatch(getQuestions());
    this.questions$ = this.store.select((state) => state.questions.questions);
  }
}
