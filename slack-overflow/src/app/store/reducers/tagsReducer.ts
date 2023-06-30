import { createReducer, on } from '@ngrx/store';
import * as TagActions from '../actions/tagActions';
import { TagsState } from 'src/app/interface';

export const initialState: TagsState = {
  tags: [],
  currentTag: null,
  loading: false,
  error: null,
};

export const TagsReducer = createReducer(
  initialState,
  on(TagActions.getTags, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TagActions.getTagsSuccess, (state, { tags }) => ({
    ...state,
    tags,
    loading: false,
    error: null,
  })),
  on(TagActions.getTagsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TagActions.getCurrentTagSuccess, (state, { tag }) => ({
    ...state,
    currentTag: tag,
  }))
);
