import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-admin-moderator-menu-drawer',
  imports: [RouterLink],
  templateUrl: './admin-moderator-menu-drawer.component.html',
  styleUrl: './admin-moderator-menu-drawer.component.css',
})
export class AdminModeratorMenuDrawerComponent {
  user: any = {};
  private authService = inject(AuthService);

  @Output() closeMenu = new EventEmitter<void>();

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
    }
  }

  closeMenuOnly(): void {
    this.closeMenu.emit();
  }

  logout(): void {
    this.authService.logout();
  }

}
