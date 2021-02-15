import { Component, EventEmitter, Output } from '@angular/core';
import { Role } from 'src/app/interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isSudo = false;
  role: Role;

  constructor(private auth: AuthService) {
    this.role = auth.user.role;
  }

  @Output() logout = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }
}
