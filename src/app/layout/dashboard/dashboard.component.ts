import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../interfaces/user';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  role: Role;

  constructor(private auth: AuthService, private router: Router) {
    if (auth.user.role === `JUDGE`) { router.navigate([`/submissions`]); }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
