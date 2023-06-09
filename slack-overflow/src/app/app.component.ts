import { Component } from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [AuthComponent, RouterModule, NavComponent, FooterComponent]
})
export class AppComponent {
  title = 'slack-overflow';
}
