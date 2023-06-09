import { createAction, props } from '@ngrx/store';
import {  UserSignIn, UserAuthSuccess, UserSignUp } from '../../interface';

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ payload: UserSignUp }>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ message: string }>()
);

export const signUpFailure = createAction(
  '[Auth] Sign Up Failure',
  props<{ error: string }>()
);

export const signIn = createAction(
  '[Auth] SignIn',
  props<{ payload: UserSignIn }>() 
);

export const signInSuccess = createAction(
  '[Auth] SignIn Success',
  props<{ message: string }>()
);

export const signInFailure = createAction(
  '[Auth] SignIn Failure',
  props<{ error: string }>()
);

export const signOut = createAction(
  '[Auth] SignOut'
);

export const signOutSuccess = createAction(
  '[Auth] SignOut Success'
);

export const signOutFailure = createAction(
  '[Auth] SignOut Failure',
  props<{ error: string }>()
);