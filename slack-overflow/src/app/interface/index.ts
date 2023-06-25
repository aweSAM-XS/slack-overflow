export interface AuthState {
  signingUp: boolean;
  signUpSuccess: boolean;
  signingIn: boolean;
  signInSuccess: boolean;
  error: string | null;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  location?: string;
  website?: string;
  twitter?: string;
  github?: string;
  created_on: Date;
  is_approved: boolean;
  email_sent: boolean;
  is_deleted: boolean;
  passwordResetRequested: boolean;
}

export interface UserLinks {
  github: string;
  twitter: string;
  website_url: string;
}

export interface UserSignUp {
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

export interface Question {
  tags: string[];
  user_id: string;
  creation_date: number;
  last_edit_date: number;
  question_id: string;
  question_title: string;
  question_body: string;
}

export interface Answer {
  is_accepted: boolean;
  score: number;
  last_edit_date: number;
  creation_date: number;
  answer_id: number;
  question_id: number;
  owner_id: number;
}

export interface Tag {
  tag_name: string;
  Tag_description: string;
}

export interface Comment {
  edited: boolean;
  score: number;
  creation_date: number;
  post_id: string;
  comment_id: string;
  owner_id: string;
}

export interface TagsState {
  tags: Tag[];
  currentTag: string | null;
  loading: boolean;
  error: string | null;
}

export interface QuestionsState {
  questions: Question[];
  currentQuestion: Question | undefined;
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  users: User[];
  currentUser: User | undefined;
  loading: boolean;
  error: string | null;
}
