import { createAction, props } from '@ngrx/store';
import { Answer } from '../../interface';

// Add Answer Actions
export const addAnswer = createAction(
  '[Answer] Add Answer',
  props<{ question_id: string; answerBody: string }>()
);

export const addAnswerSuccess = createAction(
  '[Answer] Add Answer Success',
  props<{ message: string }>()
);

export const addAnswerFailure = createAction(
  '[Answer] Add Answer Failure',
  props<{ error: string }>()
);

// Get Answers by Question Actions
export const getAnswersByQuestion = createAction(
  '[Answer] Get Answers By Question',
  props<{ question_id: string }>()
);

export const getAnswersByQuestionSuccess = createAction(
  '[Answer] Get Answers By Question Success',
  props<{ answers: Answer[] }>()
);

export const getAnswersByQuestionFailure = createAction(
  '[Answer] Get Answers By Question Failure',
  props<{ error: string }>()
);

// Get Answers by User Actions
export const getAnswersByUser = createAction('[Answer] Get Answers By User');

export const getAnswersByUserSuccess = createAction(
  '[Answer] Get Answers By User Success',
  props<{ answers: Answer[] }>()
);

export const getAnswersByUserFailure = createAction(
  '[Answer] Get Answers By User Failure',
  props<{ error: string }>()
);

// Accept Answer Actions
export const acceptAnswer = createAction(
  '[Answer] Accept Answer',
  props<{ question_id: string; answer_id: string }>()
);

export const acceptAnswerSuccess = createAction(
  '[Answer] Accept Answer Success',
  props<{ message: string }>()
);

export const acceptAnswerFailure = createAction(
  '[Answer] Accept Answer Failure',
  props<{ error: string }>()
);

// Delete Answer Actions
export const deleteAnswer = createAction(
  '[Answer] Delete Answer',
  props<{ answer_id: string }>()
);

export const deleteAnswerSuccess = createAction(
  '[Answer] Delete Answer Success',
  props<{ message: string }>()
);

export const deleteAnswerFailure = createAction(
  '[Answer] Delete Answer Failure',
  props<{ error: string }>()
);
