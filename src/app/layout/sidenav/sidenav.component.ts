import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isSudo = false;

  constructor(private auth: AuthService) {
    this.isSudo = auth.user.role === 'SUDO';
  }

  @Output() logout = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }
}
