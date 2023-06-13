import { AuthState, QuestionsState, TagsState } from '../interface';

export interface AppState {
  auth: AuthState;
  tags: TagsState;
  questions: QuestionsState;
}
