import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Observable, Subscription, map } from 'rxjs';
import { NewQuestion, Tag } from 'src/app/interface';
import { getTags } from 'src/app/store/actions/tagActions';
import { addQuestion } from 'src/app/store/actions/questionActions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit, OnDestroy {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  store = inject(Store<AppState>);
  questionForm!: FormGroup;
  private subscription!: Subscription;
  tagSuggestions$!: Observable<Tag[]>;
  newTag = '';
  tags: Tag[] = [];

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
    this.store.dispatch(getTags());
    this.tagSuggestions$ = this.store
      .select((state) => state.tags.tags)
      .pipe(
        map((tags) =>
          tags.filter((tag: Tag) => tag.tag_name.startsWith(this.newTag.trim()))
        ),
        map((tags) => {
          return tags;
        })
      );
  }

  sam() {
    return this.tagSuggestions$.pipe(
      map((s) => {
        return s;
      })
    );
  }

  addTag() {
    console.log(this.newTag);
    if (this.newTag.trim() !== '') {
      this.subscription = this.store
        .select((state) => state.tags.tags)
        .pipe(
          map((tags: Tag[]) => {
            const existingTag = tags.find(
              (t) => t.tag_name === this.newTag
            ) as Tag;
            if (existingTag) {
              console.log(existingTag);
              this.tags.push(existingTag);
              this.newTag = '';
            }
          })
        )
        .subscribe();
    }
  }

  addSuggestedTag(tag: Tag) {
    if (
      this.tags.length < 5 &&
      !this.tags.some((t) => t.tag_name === tag.tag_name)
    ) {
      this.tags.push(tag);
      this.newTag = '';
    }
  }

  removeTag(tag: Tag) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const { title, body } = this.questionForm.value;
      const question: NewQuestion = {
        question_title: title,
        question_body: body,
        tags: this.tags.map((t) => t.tag_id),
      };
      this.store.dispatch(addQuestion({ question }));
      this.questionForm.reset();
      this.router.navigate(['/questions']);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
