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
    username: string;
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
  question_id: string;
  user_id: string;
  question_title: string;
  question_body: string;
  creation_date: Date;
  edit_date: string | null;
  is_deleted: boolean;
  answer_count: number;
  question_tags: string;
  // Array<{ tag_id: string; tag_name: string }>;
}

export interface NewQuestion {
  question_title: string;
  question_body: string;
  tags: string[];
}

export interface Answer {
  answer_id: string;
  user_id: string;
  username: string;
  answer_body: string;
  create_date: Date;
  vote_count: number;
}

export interface Success {
  message: string;
}

export interface Tag {
  tag_id: string;
  tag_name: string;
  Tag_description: string;
  question_count: number;
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
  currentTag: Tag | null;
  loading: boolean;
  error: string | null;
}

export interface QuestionsState {
  questions: Question[];
  currentQuestion: Question | undefined;
  questionTags: Question[] | null;
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  users: User[];
  currentUser: User | undefined;
  loading: boolean;
  error: string | null;
}
