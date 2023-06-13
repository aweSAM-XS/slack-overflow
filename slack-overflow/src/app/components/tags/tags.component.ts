import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Tag } from '../../interface';
import { AppState } from 'src/app/store/app.state';
import { getTags } from 'src/app/store/actions/tagActions';
import { PaginationComponent } from '../pagination/pagination.component';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  store = inject(Store<AppState>)
  tagsService = inject(TagsService);
  tags$!: Observable<Tag[]>;
  tags!: Tag[];
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.loadTags();
    this.loading$ = this.store.select((state) => state.Tags.loading);
    this.error$ = this.store.select((state) => state.Tags.error);
  }

  loadTags() {
    this.store.dispatch(getTags());
    this.tags$ = this.store.select((state) => state.tags.tags);
    this.tags$.subscribe((Tags) => {
      console.log(Tags);
    });
  }
}
