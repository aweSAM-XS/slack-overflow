import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/interface';
import { UsersService } from 'src/app/services/users.service';
import { getUser } from 'src/app/store/actions/userActions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user!: User;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.store.dispatch(getUser({ id: this.id }))
    // this.user$ = this.store.select(state=>state.)
    this.userService.getUser(this.id).subscribe((user) => {
      this.user = user as User;
    });
  }
}
