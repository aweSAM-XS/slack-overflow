import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/userActions';
import { UsersState } from 'src/app/interface';

export const initialState: UsersState = {
  users: [],
  currentUser: undefined,
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(UserActions.getUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),
  on(UserActions.getUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.getUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.getUserSuccess, (state, { currentUser }) => ({
    ...state,
    currentUser,
    loading: false,
    error: null,
  })),
  on(UserActions.getUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
