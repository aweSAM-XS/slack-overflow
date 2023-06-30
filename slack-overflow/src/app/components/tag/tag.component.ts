import { AppState } from './../../store/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { getQuestionsByTagName } from 'src/app/store/actions/questionActions';
import { Observable } from 'rxjs';
import { Question, Tag } from 'src/app/interface';
import { getCurrentTag } from 'src/app/store/actions/tagActions';
import { LoaderComponent } from '../loader/loader.component';
import { RelativeDatePipe } from 'src/app/pipes/relative-date.pipe';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, LoaderComponent, RelativeDatePipe],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  store = inject(Store<AppState>);
  tag_name!: string;
  tag$!: Observable<Tag>;
  loading$!: Observable<boolean>;
  tagsArray!: Array<{ tag_id: string; tag_name: string }>;
  questions$!: Observable<Question[]>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tag_name = params['tag_name'];
      this.store.dispatch(getCurrentTag({ tag_name: this.tag_name }));
      this.loadTagQuestions(this.tag_name);
      this.loading$ = this.store.select((state) => state.questions.loading) || this.store.select((state) => state.answers.loading);
      this.error$ = this.store.select((state) => state.questions.error);
    });
  }

  loadTagQuestions(tag_name: string) {
    this.store.dispatch(getQuestionsByTagName({ tag_name }));
    this.store.dispatch(getCurrentTag({ tag_name }));
    this.tag$ = this.store.select((state) => state.tags.currentTag);
    this.questions$ = this.store.select(
      (state) => state.questions.questionTags
    );
  }

  parseTags(tagsString: string): any[] {
    try {
      this.tagsArray = JSON.parse(tagsString);
      return this.tagsArray;
    } catch (error) {
      console.error('Error parsing tags:', error);
      return [];
    }
  }

  seeQuestion(id: string) {
    this.router.navigate([`/questions/${id}`]);
  }

  seeTag(tag_name: string, event:Event) {
    event.stopPropagation();
    this.router.navigate([`/questions/tags/${tag_name}`]);
  }
}
