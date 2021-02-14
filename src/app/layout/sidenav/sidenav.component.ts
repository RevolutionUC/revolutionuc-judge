import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isSudo = false;
  isAdmin = false;
  isJudge = false;

  constructor(private auth: AuthService) {
    this.isSudo = true; //auth.user.role === 'SUDO';
    this.isAdmin = true; //auth.user.role === 'ADMIN';
    this.isJudge = true; //auth.user.role === 'JUDGE';
  }

  @Output() logout = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }
}
