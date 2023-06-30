import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getAnswersByQuestion } from 'src/app/store/actions/answerActions';
import { Answer } from 'src/app/interface';
import { Observable } from 'rxjs';
import { RelativeDatePipe } from 'src/app/pipes/relative-date.pipe';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [CommonModule, RelativeDatePipe],
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css'],
})
export class AnswersComponent implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(Store<AppState>);
  question_id!: string;
  answers$!: Observable<Answer[]>;
  router = inject(Router);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.question_id = params['id'];
      this.getAnswers(this.question_id);
    });
  }
  getAnswers(question_id: string) {
    this.store.dispatch(getAnswersByQuestion({ question_id }));
    this.answers$ = this.store.select((state) => state.answers.answers);
  }

  seeUser(user_id: string) {
    this.router.navigate([`/users/${user_id}`]);
  }
}
