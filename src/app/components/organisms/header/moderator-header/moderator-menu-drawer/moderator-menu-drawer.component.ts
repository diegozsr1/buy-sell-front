import { Component, EventEmitter, Output, signal, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-moderator-menu-drawer',
  imports: [RouterLink],
  templateUrl: './moderator-menu-drawer.component.html',
  styleUrl: './moderator-menu-drawer.component.css',
})
export class ModeratorMenuDrawerComponent {
  user: any = {};
  private authService = inject(AuthService);

  //admin loggado?
  isAdmin = signal<boolean>(false);

  @Output() closeMenu = new EventEmitter<void>();

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
      this.isAdmin.set(this.user.rol === 'Administrador');
    }
  }

  close(): void {
    this.closeMenu.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}
