import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessagingSocketService } from './messaging-socket-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly messagingSocket = inject(MessagingSocketService);
  private readonly authChanged = new Subject<void>();

  readonly authChanged$ = this.authChanged.asObservable();

  isAuthenticated(): boolean {
    return !!(localStorage.getItem('token') && localStorage.getItem('usuarioBuy&Sell'));
  }

  clearSession(): void {
    localStorage.clear();
    this.messagingSocket.disconnect();
    this.messagingSocket.setUnreadCount(0);
    this.authChanged.next();
  }

  logout(): void {
    this.clearSession();
    window.location.href = '/login';
  }
}
