import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent {
  questionForm!: FormGroup;
  newTag: string = '';
  tags: string[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  addTag() {
    if (this.newTag.trim() !== '') {
      this.tags.push(this.newTag.trim());
      this.newTag = '';
      console.log(this.tags);
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      console.log('Form submitted:', this.questionForm.value);
      this.questionForm.reset();
    }
  }
}
