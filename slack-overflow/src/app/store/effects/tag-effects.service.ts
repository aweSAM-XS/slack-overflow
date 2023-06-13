import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TagsService } from 'src/app/services/tags.service';
import * as TagActions from '../actions/tagActions'
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagEffects {

  constructor(
    private tagsService: TagsService,
    private actions$: Actions
  ) {}

  getQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TagActions.getTags),
      mergeMap(() => {
        return this.tagsService.getTags().pipe(
          map((tags) =>
          TagActions.getTagsSuccess({ tags })
          ),
          catchError((error) =>
            of(TagActions.getTagsFailure({ error }))
          )
        );
      })
    );
  });
}
