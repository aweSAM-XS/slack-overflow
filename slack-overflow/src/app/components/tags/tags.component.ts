import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Tag } from '../../interface';
import { AppState } from 'src/app/store/app.state';
import { getTags } from 'src/app/store/actions/tagActions';
import { TagsService } from 'src/app/services/tags.service';
import { LoaderComponent } from '../loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  router = inject(Router);
  store = inject(Store<AppState>);
  tagsService = inject(TagsService);
  tags$!: Observable<Tag[]>;
  tags!: Tag[];
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.loadTags();
    this.loading$ = this.store.select((state) => state.tags.loading);
    this.error$ = this.store.select((state) => state.tags.error);
  }

  loadTags() {
    this.store.dispatch(getTags());
    this.tags$ = this.store.select((state) => state.tags.tags);
  }

  seeTag(tag_name: string, event: Event) {
    event.stopPropagation();
    this.router.navigate([`/questions/tags/${tag_name}`]);
  }
}
