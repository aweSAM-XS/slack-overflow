export interface AuthState {
  signingUp: boolean;
  signUpSuccess: boolean;
  signingIn: boolean;
  signInSuccess: boolean;
  error: string | null;
}

export interface User {
  user_id: string;
  user_type: string;
  asked: number;
  answered: number;
  accept_rate: number;
  profile_image: string;
  display_name: string;
  location: string;
  creation_date: number;
  links: UserLinks;
}

export interface UserLinks {
  github: string;
  twitter: string;
  website_url: string;
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

export interface Question {
  tags: string[];
  owner_id: string;
  is_answered: boolean;
  view_count: number;
  accepted_answer_id: string;
  answer_count: number;
  score: number;
  creation_date: number;
  last_edit_date: number;
  question_id: string;
  title: string;
  body: string;
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
  name: string;
  count: number;
  description: string;
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
