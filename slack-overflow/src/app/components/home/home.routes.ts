import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { QuestionsComponent } from '../questions/questions.component';
import { TagsComponent } from '../tags/tags.component';
import { UsersComponent } from '../users/users.component';
import { AskComponent } from '../ask/ask.component';
import { QuestionComponent } from '../question/question.component';
import { UserComponent } from '../user/user.component';
import { HeroComponent } from '../landing/hero/hero.component';
import { TagComponent } from '../tag/tag.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HeroComponent,
        pathMatch: "full"
      },
      {
        path: 'questions',
        component: QuestionsComponent,
      },
      {
        path: 'tags',
        component: TagsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/:id',
        component: UserComponent,
      },
      {
        path: 'questions/ask',
        component: AskComponent,
      },
      {
        path: 'questions/tags/:tag_name',
        component: TagComponent,
      },
      {
        path: 'questions/:id',
        component: QuestionComponent,
      },
    ],
  },
];
