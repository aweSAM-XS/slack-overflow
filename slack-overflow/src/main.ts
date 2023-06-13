import { QuestionEffects } from './app/store/effects/question-effects.service';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ROUTES } from './main.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './app/store/reducers/authReducer';
import { AuthEffects } from './app/store/effects/auth-effects.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthService } from './app/services/auth.service';
import { questionsReducer } from './app/store/reducers/questionsReducers';
import { TagsReducer } from './app/store/reducers/tagsReducer';
import { TagEffects } from './app/store/effects/tag-effects.service';
import { UserEffects } from './app/store/effects/user-effects.service';
import { usersReducer } from './app/store/reducers/usersReducer';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(ROUTES),
    provideStore({
      auth: authReducer,
      questions: questionsReducer,
      tags: TagsReducer,
      users: usersReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(AuthEffects, QuestionEffects, TagEffects, UserEffects),
    provideHttpClient(withInterceptorsFromDi()),
    AuthService,
  ],
}).catch((err) => console.error(err));
