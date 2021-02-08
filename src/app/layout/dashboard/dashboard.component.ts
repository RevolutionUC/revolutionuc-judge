import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // constructor(private auth: AuthService, private router: Router) {}
  constructor(private router: Router) {}

  logout() {
    // this.auth.logout();
    this.router.navigate(['/login']);
  }
}
