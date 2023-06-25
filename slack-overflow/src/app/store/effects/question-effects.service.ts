import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuestionsService } from 'src/app/services/questions.service';
import * as QuestionActions from '../actions/questionActions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionEffects {
  constructor(
    private questionService: QuestionsService,
    private actions$: Actions
  ) {}

  getQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.getQuestions),
      mergeMap(() => {
        return this.questionService.getQuestions().pipe(
          map((questions) =>
            QuestionActions.getQuestionsSuccess({ questions })
          ),
          catchError((error) =>
            of(QuestionActions.getQuestionsFailure({ error }))
          )
        );
      })
    );
  });

  getQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.getQuestion),
      mergeMap((action) =>
        this.questionService.getQuestion(action.id).pipe(
          map((question) => {
            return QuestionActions.getQuestionSuccess({
              currentQuestion: question,
            });
          }),
          catchError((error: any) =>
            of(QuestionActions.getQuestionFailure(error))
          )
        )
      )
    )
  );
}
