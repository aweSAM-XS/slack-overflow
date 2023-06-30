import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface';
import { getUser } from 'src/app/store/actions/userActions';
import { AppState } from 'src/app/store/app.state';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(Store<AppState>);
  user$!: Observable<User>;
  id!: string;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.loadUser(this.id);
      this.loading$ = this.store.select((state) => state.users.loading);
      this.error$ = this.store.select((state) => state.users.error);
    });
  }

  loadUser(id: string) {
    this.store.dispatch(getUser({ id }));
    this.user$ = this.store.select((state) => state.users.currentUser);
  }
}
