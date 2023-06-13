import { createAction, props } from '@ngrx/store';
import { Question } from 'src/app/interface';

//get all Questions
export const getQuestions = createAction('[Questions] Get All Questions');

export const getQuestionsSuccess = createAction(
  '[Questions API] Questions Load Success',
  props<{ questions: Question[] }>()
);
export const getQuestionsFailure = createAction(
  '[Questions API] Questions Load Failure',
  props<{ error: any }>()
);

//add Question
export const addQuestion = createAction(
  '[Questions] Add Question',
  props<{ newQuestion: Question }>()
);
export const addQuestionSuccess = createAction(
  '[Add Question API] Add Question Success',
  props<{ message: string }>()
);
export const addQuestionFailure = createAction(
  '[Add Question API] Add Question Failure',
  props<{ error: string }>()
);

//get one Question
export const getQuestion = createAction(
  '[Products] Get one Question',
  props<{ id: string }>()
);
export const getQuestionSuccess = createAction(
  '[Questions API] Questions Load Success',
  props<{ currentQuestion: Question | undefined }>()
);
export const getQuestionFailure = createAction(
  '[Questions API] Questions Load Failure',
  props<{ error: string }>()
);

//delete Question
export const deleteQuestion = createAction(
  '[Questions] Delete Question',
  props<{ name: string }>()
);
export const deleteQuestionSuccess = createAction(
  '[Questions API] Delete Question Success',
  props<{ message: string }>()
);
export const deleteQuestionFailure = createAction(
  '[Questions API] Delete Question Failure',
  props<{ error: string }>()
);
