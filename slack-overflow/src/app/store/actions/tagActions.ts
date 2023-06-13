import { createAction, props } from '@ngrx/store';
import { Tag } from 'src/app/interface';

//get all tags
export const getTags = createAction('[Tags] Get All Tags');
export const getTagsSuccess = createAction(
  '[Tags API] Tags Load Success',
  props<{ tags: Tag[] }>()
);
export const getTagsFailure = createAction(
  '[Tags API] Tags Load Failure',
  props<{ error: string }>()
);

//add tag
export const addTag = createAction('[Tags] Add Tag', props<{ newTag: Tag }>());
export const addTagSuccess = createAction(
  '[Add Tag API] Add Tag Success',
  props<{ message: string }>()
);
export const addTagFailure = createAction(
  '[Add Tag API] Add Tag Failure',
  props<{ error: string }>()
);

//get one tag
export const getTag = createAction(
  '[Products] Get one Tag',
  props<{ name: string }>()
);
export const getTagSuccess = createAction(
  '[Tags API] Tags Load Success',
  props<{ tag: Tag }>()
);
export const getTagFailure = createAction(
  '[Tags API] Tags Load Failure',
  props<{ error: string }>()
);

//delete tag
export const deleteTag = createAction(
  '[Tags] Delete Tag',
  props<{ name: string }>()
);
export const deleteTagSuccess = createAction(
  '[Tags API] Delete Tag Success',
  props<{ message: string }>()
);
export const deleteTagFailure = createAction(
  '[Tags API] Delete Tag Failure',
  props<{ error: string }>()
);
