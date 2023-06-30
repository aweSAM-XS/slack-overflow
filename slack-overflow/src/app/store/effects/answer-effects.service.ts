import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AnswerActions from '../actions/answerActions';
import { AnswerService } from '../../services/answers.service';

@Injectable()
export class AnswerEffects {
  constructor(
    private actions$: Actions,
    private answerService: AnswerService
  ) {}

  addAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.addAnswer),
      mergeMap((action) =>
        this.answerService
          .addAnswer(action.question_id, action.answerBody)
          .pipe(
            map(() =>
              AnswerActions.addAnswerSuccess({
                message: 'Answer submitted successfully',
              })
            ),
            catchError((error) =>
              of(AnswerActions.addAnswerFailure({ error: error.message }))
            )
          )
      )
    )
  );

  getAnswersByQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.getAnswersByQuestion),
      mergeMap((action) =>
        this.answerService.getAnswersByQuestion(action.question_id).pipe(
          map((answers) => {
            return AnswerActions.getAnswersByQuestionSuccess({ answers });
          }),
          catchError((error) =>
            of(
              AnswerActions.getAnswersByQuestionFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  getAnswersByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.getAnswersByUser),
      mergeMap(() =>
        this.answerService.getAnswersByUser().pipe(
          map((answers) => AnswerActions.getAnswersByUserSuccess({ answers })),
          catchError((error) =>
            of(AnswerActions.getAnswersByUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  acceptAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.acceptAnswer),
      mergeMap((action) =>
        this.answerService
          .acceptAnswer(action.question_id, action.answer_id)
          .pipe(
            map(() =>
              AnswerActions.acceptAnswerSuccess({
                message: 'Answer has been accepted',
              })
            ),
            catchError((error) =>
              of(AnswerActions.acceptAnswerFailure({ error: error.message }))
            )
          )
      )
    )
  );

  deleteAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.deleteAnswer),
      mergeMap((action) =>
        this.answerService.deleteAnswer(action.answer_id).pipe(
          map(() =>
            AnswerActions.deleteAnswerSuccess({
              message: 'Answer has been deleted',
            })
          ),
          catchError((error) =>
            of(AnswerActions.deleteAnswerFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
