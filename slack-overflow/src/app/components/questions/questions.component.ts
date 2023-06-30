import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from 'src/app/interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  getQuestion,
  getQuestions,
} from 'src/app/store/actions/questionActions';
import { QuestionsService } from 'src/app/services/questions.service';
import { Router, RouterModule } from '@angular/router';
import { RelativeDatePipe } from 'src/app/pipes/relative-date.pipe';
import { LoaderComponent } from '../loader/loader.component';
import { AutoResizeTextareaDirective } from 'src/app/directives/autoresize-textarea.directive';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, RouterModule, RelativeDatePipe,LoaderComponent, AutoResizeTextareaDirective],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  store = inject(Store<AppState>);
  router = inject(Router);
  questionsService = inject(QuestionsService);
  questions$!: Observable<Question[]>;
  questions!: Question[];
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  tagsArray!: Array<{ tag_id: string; tag_name: string }>;

  ngOnInit(): void {
    this.loadQuestions();
    this.loading$ = this.store.select((state) => state.questions.loading);
    this.error$ = this.store.select((state) => state.questions.error);
  }

  loadQuestions() {
    this.store.dispatch(getQuestions());
    this.questions$ = this.store.select((state) => state.questions.questions);
  }

  parseTags(tagsString: string): any[] {
    try {
      this.tagsArray = JSON.parse(tagsString);
      return this.tagsArray;
    } catch (error) {
      console.error('Error parsing tags:', error);
      return [];
    }
  }

  seeQuestion(id: string) {
    this.router.navigate([`/questions/${id}`]);
  }

  seeTag(tag_name: string, event:Event) {
    event.stopPropagation();
    this.router.navigate([`/questions/tags/${tag_name}`]);
  }
}
