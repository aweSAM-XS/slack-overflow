import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interface';
import { getUsers } from 'src/app/store/actions/userActions';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  store = inject(Store<AppState>);
  usersService = inject(UsersService);
  users$!: Observable<User[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.loadUsers();
    this.loading$ = this.store.select((state) => state.users.loading);
    this.error$ = this.store.select((state) => state.users.error);
  }

  loadUsers() {
    this.store.dispatch(getUsers());
    this.users$ = this.store.select((state) => state.users.users);
  }
}
