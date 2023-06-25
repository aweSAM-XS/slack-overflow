import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsService } from 'src/app/services/questions.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getQuestion } from 'src/app/store/actions/questionActions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  question$!: Observable<Question | undefined>;
  id!: string;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.store.dispatch(getQuestion({ id: this.id }));
    this.question$ = this.store.select((state) => state.questions.currentQuestion);
  }
}
