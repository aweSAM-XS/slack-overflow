import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuestionsService } from 'src/app/services/questions.service';
import * as QuestionActions from '../actions/questionActions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionEffects {
  questionService = inject(QuestionsService);
  actions$ = inject(Actions);

  addQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.addQuestion),
      mergeMap((action) =>
        this.questionService.addQuestion(action.question).pipe(
          map((response) =>
            QuestionActions.addQuestionSuccess({ message: response.message })
          ),
          catchError((error: any) =>
            of(QuestionActions.addQuestionFailure({ error }))
          )
        )
      )
    )
  );

  getQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.getQuestions),
      mergeMap(() => {
        return this.questionService.getQuestions(10, 1).pipe(
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

  getQuestionsByTagName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.getQuestionsByTagName),
      mergeMap((action) => {
        return this.questionService.getQuestionsByTagName(action.tag_name).pipe(
          map((questions) =>
            QuestionActions.getQuestionsByTagNameSuccess({ questions })
          ),
          catchError((error) =>
            of(QuestionActions.getQuestionsByTagNameFailure({ error }))
          )
        );
      })
    );
  });
}
