import { ChangeDetectorRef, Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderProfile } from '../../molecules/header-profile/header-profile';
import { SidebarVariant } from './sidebar.config';
import { RatingsService } from '../../../services/ratings-service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'organism-sidebar',
  imports: [RouterLink, RouterLinkActive, HeaderProfile],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public role = input<SidebarVariant>('user');
  
  mensaje: string = '';
  tipo: boolean = false;
  user: any = {};
  ratingsService = inject(RatingsService);
  private authService = inject(AuthService);
  ratings: any = {};

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
      this.ratingsService.getAverageRatingsByUser(this.user.id).subscribe({
        next: (data) => {
          if (data.error) {
            this.mensaje = data.error;
            return;
          } else {
            this.ratings = data;
            this.cd.detectChanges();
          }
        },
        error: (err) => {
          console.error(err);

        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }

  showAdminBtn = computed(() => {
    const raw = localStorage.getItem('usuarioBuy&Sell');
    if (!raw) return false;
    const user = JSON.parse(raw);
    return user.rol === 'Administrador' && !window.location.href.includes('/admin/panel');
  });
}




