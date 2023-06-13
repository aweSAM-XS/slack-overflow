import { createReducer, on } from '@ngrx/store';
import * as QuestionsActions from '../actions/questionActions';
import { QuestionsState } from 'src/app/interface';

export const initialState: QuestionsState = {
  questions: [],
  currentQuestion: undefined,
  loading: false,
  error: null,
};

export const questionsReducer = createReducer(
  initialState,
  on(QuestionsActions.getQuestions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(QuestionsActions.getQuestionsSuccess, (state, { questions }) => ({
    ...state,
    questions,
    loading: false,
    error: null,
  })),
  on(QuestionsActions.getQuestionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(QuestionsActions.getQuestion, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(QuestionsActions.getQuestionSuccess, (state, { currentQuestion }) => ({
    ...state,
    currentQuestion,
    loading: false,
    error: null,
  })),
  on(QuestionsActions.getQuestionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
