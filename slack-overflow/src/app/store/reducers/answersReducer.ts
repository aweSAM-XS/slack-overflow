import { createReducer, on } from '@ngrx/store';
import { Answer } from '../../interface';
import {
  addAnswer,
  addAnswerSuccess,
  addAnswerFailure,
  getAnswersByQuestion,
  getAnswersByQuestionSuccess,
  getAnswersByQuestionFailure,
  getAnswersByUser,
  getAnswersByUserSuccess,
  getAnswersByUserFailure,
  acceptAnswer,
  acceptAnswerSuccess,
  acceptAnswerFailure,
  deleteAnswer,
  deleteAnswerSuccess,
  deleteAnswerFailure,
} from '../actions/answerActions';

export interface AnswerState {
  answers: Answer[];
  loading: boolean;
  error: string | null;
}

export const initialState: AnswerState = {
  answers: [],
  loading: false,
  error: null,
};

export const answerReducer = createReducer(
  initialState,
  on(addAnswer, (state) => ({ ...state, loading: true, error: null })),
  on(addAnswerSuccess, (state) => ({ ...state, loading: false, error: null })),
  on(addAnswerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(getAnswersByQuestion, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(getAnswersByQuestionSuccess, (state, { answers }) => ({
    ...state,
    answers,
    loading: false,
    error: null,
  })),
  on(getAnswersByQuestionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(getAnswersByUser, (state) => ({ ...state, loading: true, error: null })),
  on(getAnswersByUserSuccess, (state, { answers }) => ({
    ...state,
    answers,
    loading: false,
    error: null,
  })),
  on(getAnswersByUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(acceptAnswer, (state) => ({ ...state, loading: true, error: null })),
  on(acceptAnswerSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(acceptAnswerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(deleteAnswer, (state) => ({ ...state, loading: true, error: null })),
  on(deleteAnswerSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(deleteAnswerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
