import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/authActions';
import { AuthState } from 'src/app/interface';

const initialSignUpState: AuthState = {
  signingUp: false,
  signUpSuccess: false,
  signingIn: false,
  signInSuccess: false,
  error: null,
};

export const authReducer = createReducer(
  initialSignUpState,
  on(AuthActions.signUp, (state) => ({
    ...state,
    signingUp: true,
    signUpSuccess: false,
    error: null,
  })),
  on(AuthActions.signUpSuccess, (state) => ({
    ...state,
    signingUp: false,
    signUpSuccess: true,
    error: null,
  })),
  on(AuthActions.signUpFailure, (state, { error }) => ({
    ...state,
    signingUp: false,
    signUpSuccess: false,
    error,
  })),

  on(AuthActions.signIn, (state) => ({
    ...state,
    signingIn: true,
    signInSuccess: false,
    error: null,
  })),
  on(AuthActions.signInSuccess, (state) => ({
    ...state,
    signingIn: false,
    signInSuccess: true,
    error: null,
  })),
  on(AuthActions.signInFailure, (state, { error }) => ({
    ...state,
    signingIn: false,
    signInSuccess: false,
    error,
  })),

  on(AuthActions.signOut, (state) => ({
    ...state,
    signingIn: false,
    signInSuccess: false,
    error: null,
  }))
);
