import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GuestHeaderComponent } from './guest-header/guest-header.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AdminModeratorHeaderComponent } from './admin-moderator-header/admin-moderator-header.component';
import { ModeratorHeaderComponent } from './moderator-header/moderator-header.component';
import { AuthService } from '../../../services/auth.service';
import { filter, Subscription } from 'rxjs';

type UserRole = 'guest' | 'user' | 'moderator' | 'admin';

@Component({
  selector: 'app-header',
  imports: [GuestHeaderComponent, UserHeaderComponent, AdminModeratorHeaderComponent, ModeratorHeaderComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  isLogged = false;
  role: UserRole = 'guest';
  isAdminInModeratorPanel = false;

  private authSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  get isGuest(): boolean {
    return !this.isLogged;
  }

  get isUser(): boolean {
    return this.isLogged && this.role === 'user';
  }

  get isAdmin(): boolean {
    return this.isLogged && this.role === 'admin' && !this.isAdminInModeratorPanel;
  }

  get isModerator(): boolean {
    return (this.isLogged && this.role === 'moderator') ||
      (this.isLogged && this.role === 'admin' && this.isAdminInModeratorPanel);
  }

  ngOnInit(): void {
    this.syncAuthState();
    this.checkRoute(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.syncAuthState();
        this.checkRoute(event.urlAfterRedirects);
      });

    this.authSubscription = this.authService.authChanged$.subscribe(() => {
      this.syncAuthState();
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  private syncAuthState(): void {
    this.isLogged = this.authService.isAuthenticated();

    if (!this.isLogged) {
      this.role = 'guest';
      return;
    }

    const usuario = JSON.parse(localStorage.getItem('usuarioBuy&Sell')!);

    switch (usuario.rol) {
      case 'Administrador':
        this.role = 'admin';
        break;
      case 'Moderador':
        this.role = 'moderator';
        break;
      case 'Usuario':
        this.role = 'user';
        break;
      default:
        this.role = 'guest';
    }
  }

  private checkRoute(url: string): void {
    this.isAdminInModeratorPanel = this.role === 'admin' && url.startsWith('/moderator');
  }
}
