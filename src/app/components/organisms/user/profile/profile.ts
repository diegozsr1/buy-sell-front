import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Icon } from '../../../atoms/icon/icon';
import { Badge } from '../../../atoms/badge/badge';
import { Button } from '../../../atoms/button/button';
import { StatusCard } from '../../../molecules/cards/status-card/status-card';
import { ManagementCard } from '../../../molecules/cards/management-card/management-card';
import { IArticle } from '../../../../interfaces/i-article';
import { ArticlesService } from '../../../../services/articles-service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, Icon, Badge, Button, StatusCard, ManagementCard],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private articlesService = inject(ArticlesService);
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);

  // Cabecera. TODO: cablear users-service / ratings-service para datos reales.
  userId = 1;
  nombre = 'Manuel García';
  iniciales = 'MG';
  desde = 2026;

  // Artículos del usuario (datos reales, mismo patrón que la pantalla de Ventas).
  articulos: IArticle[] = [];

  // Stats. 'publicados' se deriva de datos reales; el resto: TODO cablear services.
  vendidos = 8;
  valoracion = '4.8';

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const user = JSON.parse(usuarioString);
      this.userId = Number(user.id) || 1;
      if (user?.username) {
        this.nombre = user.username;
        this.iniciales = this.calcularIniciales(user.username);
      }
      this.articlesService.getArticlesByUser(this.userId).subscribe({
        next: (data) => {
          this.articulos = data ?? [];
          this.cd.detectChanges();
        },
        error: (err) => console.error('Error cargando artículos:', err),
      });
    }
  }

  // Nombre abreviado estilo Figma: "Manuel G."
  get nombreCorto(): string {
    const p = this.nombre.trim().split(/\s+/);
    return p.length > 1 ? `${p[0]} ${p[1][0]}.` : p[0];
  }

  // Nº de artículos publicados, derivado de los datos reales
  get publicados(): number {
    return this.articulos.filter((a) => a.estado_articulo_id === 'Publicado').length;
  }

  publicar(): void {
    this.router.navigate(['/user/new-product']);
  }

  private calcularIniciales(nombre: string): string {
    const p = nombre.trim().split(/\s+/);
    return ((p[0]?.[0] ?? '') + (p[1]?.[0] ?? '')).toUpperCase();
  }
}
