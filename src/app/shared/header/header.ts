import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GuestHeaderComponent } from './guest-header/guest-header.component';

type UserRole = 'guest' | 'user' | 'moderator' | 'admin';

@Component({
  selector: 'app-header',
  imports: [RouterLink, GuestHeaderComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isLogged = false;
  role: UserRole = 'guest';

  userInitials = 'AA';

  get isGuest(): boolean {
    return !this.isLogged || this.role === 'guest';
  }

  get isUser(): boolean {
    return this.isLogged && this.role === 'user';
  }
  get isStaff(): boolean {
    return this.isLogged && (this.role === 'moderator' || this.role === 'admin');
  }

}
