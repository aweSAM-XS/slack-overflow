export interface AuthState {
  signingUp: boolean;
  signUpSuccess: boolean;
  signingIn: boolean;
  signInSuccess: boolean;
  error: string | null;
}

export interface UserSignUp {
  firstName: string;
  username: string;
  email: string;
  password: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}

export interface UserAuthSuccess {
  token: string;
  message: string;
  payload: {
    firstName: string;
    id: string;
    role: string;
  };
}

export interface userState {
  firstName: string;
  id: string;
  role: string;
  email: string;
}
