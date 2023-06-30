import { createAction, props } from '@ngrx/store';
import { NewQuestion, Question } from 'src/app/interface';

//get all Questions
export const getQuestions = createAction('[Questions] Get All Questions');

export const getQuestionsSuccess = createAction(
  '[Questions] Questions Load Success',
  props<{ questions: Question[] }>()
);
export const getQuestionsFailure = createAction(
  '[Questions] Questions Load Failure',
  props<{ error: any }>()
);

//add Question
export const addQuestion = createAction(
  '[Questions] Add Question',
  props<{ question: NewQuestion }>()
);
export const addQuestionSuccess = createAction(
  '[Questions] Add Question Success',
  props<{ message: string }>()
);
export const addQuestionFailure = createAction(
  '[Questions] Add Question Failure',
  props<{ error: string }>()
);

//get one Question
export const getQuestion = createAction(
  '[Questions] Get one Question',
  props<{ id: string }>()
);
export const getQuestionSuccess = createAction(
  '[Questions] Question Load Success',
  props<{ currentQuestion: Question }>()
);
export const getQuestionFailure = createAction(
  '[Questions] Question Load Failure',
  props<{ error: string }>()
);

// Get Questions by Tag
export const getQuestionsByTagName = createAction(
  '[Questions] Get Questions By Tag Name',
  props<{ tag_name: string }>()
);

export const getQuestionsByTagNameSuccess = createAction(
  '[Questions] Get Questions By Tag Name Success',
  props<{ questions: Question[] }>()
);

export const getQuestionsByTagNameFailure = createAction(
  '[Questions] Get Questions By Tag Name Failure',
  props<{ error: string }>()
);

//delete Question
export const deleteQuestion = createAction(
  '[Questions] Delete Question',
  props<{ name: string }>()
);
export const deleteQuestionSuccess = createAction(
  '[Questions] Delete Question Success',
  props<{ message: string }>()
);
export const deleteQuestionFailure = createAction(
  '[Questions] Delete Question Failure',
  props<{ error: string }>()
);
