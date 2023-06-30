import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TagsService } from 'src/app/services/tags.service';
import * as TagActions from '../actions/tagActions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagEffects {
  tagsService = inject(TagsService);
  actions$ = inject(Actions);

  getTag$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TagActions.getCurrentTag),
      mergeMap((action) =>
        this.tagsService.getTag(action.tag_name).pipe(
          map((tag) => {
            return TagActions.getCurrentTagSuccess({ tag });
          }),
          catchError((error: any) => of(TagActions.getCurrentTagFailure(error)))
        )
      )
    );
  });

  getQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TagActions.getTags),
      mergeMap(() => {
        return this.tagsService.getTags().pipe(
          map((tags) => TagActions.getTagsSuccess({ tags })),
          catchError((error) => of(TagActions.getTagsFailure({ error })))
        );
      })
    );
  });
}
