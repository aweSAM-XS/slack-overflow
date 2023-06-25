import { Component, OnInit } from '@angular/core';
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
import { Observable, map } from 'rxjs';
import { Tag } from 'src/app/interface';
import { getTags } from 'src/app/store/actions/tagActions';

@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent {
  questionForm!: FormGroup;
  tagSuggestions$!: Observable<Tag[]>;
  tagSuggestions!: <Tag[]>;
  newTag: string = '';
  tags: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

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
          tags.filter((tag) => tag.name.startsWith(this.newTag.trim()))
        ),
        map((tags) => {
          return tags.slice(0, 5);
        })
      );
  }

  sam() {
    this.tagSuggestions$.subscribe((s) => console.log(s));
  }

  addTag() {
    if (this.newTag.trim() !== '' && !this.tags.includes(this.newTag.trim())) {
      this.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }

  addSuggestedTag(tag: string) {
    if (this.tags.length < 5 && !this.tags.includes(tag.trim())) {
      this.tags.push(tag);
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      console.log('Form submitted:', this.questionForm.value);
      this.questionForm.reset();
    }
  }
}
