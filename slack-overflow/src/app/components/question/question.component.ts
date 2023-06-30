import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getQuestion } from 'src/app/store/actions/questionActions';
import { Observable } from 'rxjs';
import { RelativeDatePipe } from 'src/app/pipes/relative-date.pipe';
import { AnswersComponent } from '../answers/answers.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, RelativeDatePipe, AnswersComponent],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store<AppState>);
  question$!: Observable<Question | undefined>;
  id!: string;
  tagsArray!: Array<{ tag_id: string; tag_name: string }>;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.getQuestion();
  }

  getQuestion() {
    this.store.dispatch(getQuestion({ id: this.id }));
    this.question$ = this.store.select(
      (state) => state.questions.currentQuestion
    );
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

  seeTag(tag_name: string, event:Event) {
    event.stopPropagation();
    this.router.navigate([`/questions/tags/${tag_name}`]);
  }
}
