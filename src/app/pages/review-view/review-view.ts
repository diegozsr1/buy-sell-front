import { Component, computed, inject, input, signal } from '@angular/core';
import { Breadcrum } from "../../components/molecules/breadcrum/breadcrum";
import { Router } from '@angular/router';
import { RatingsService } from '../../services/ratings-service';
import { lastValueFrom } from 'rxjs';
import { ArticlesService } from '../../services/articles-service';
import { UsersService } from '../../services/users-service';
import { IArticle } from '../../interfaces/i-article';
import { IUsuario } from '../../interfaces/i-usuario';
import { IRating } from '../../interfaces/i-rating.interface';
import { UserRatingComment } from "../../components/molecules/user-card/user-rating-comment/user-rating-comment";
import { ArticlePhotoService } from '../../services/article-photo-service';
import { IArticlePhoto } from '../../interfaces/i-article-photo.interface';
import { DatePipe } from '@angular/common';
import { Badge } from "../../components/atoms/badge/badge";

@Component({
  selector: 'app-review-view',
  imports: [Breadcrum, UserRatingComment, DatePipe, Badge],
  templateUrl: './review-view.html',
  styleUrl: './review-view.css',
})
export class ReviewView {
  //input url
  reviewID = input<string>();

  //router
  router = inject(Router)

  //servicios
  ratingService = inject(RatingsService);
  articleService = inject(ArticlesService);
  userService = inject(UsersService);
  photoService = inject(ArticlePhotoService);

  //signals
  review = signal<IRating | null>(null);
  product = signal<IArticle | null>(null);
  seller = signal<IUsuario | null>(null);
  photos = signal<IArticlePhoto[] | null>(null);

  //breadcrumbs
  protected breadcrumbItems = computed(() => [
  { label: 'Inicio', route: '/' },
  { label: 'Valoraciones' /*añadir ruta de valoracion*/},
  { label: `Artículo: ${this.product()?.titulo}` }
  ]);

  // logged user
  loggeduser = computed(() => {
    const raw = localStorage.getItem('usuarioBuy&Sell');
    if(!raw) return false;
    const loggedUser = JSON.parse(raw);
    return loggedUser;
  });

  ngOnInit() {
    this.loadData();
  }
 
  // === FUNCIONES ====
  // Load review and data
  async loadData() {

    try {
      this.review.set(await lastValueFrom(this.ratingService.getRatingByID(Number(this.reviewID()))));
    } catch (error) {
      this.router.navigate(['/500error']);
    }

    //Checkeo de que el usuario logueado sea el mismo que el que hizo la review
    
    if (this.review()?.usuario_valorador_id !== this.loggeduser()?.id) {
      this.router.navigate(['/403error']); 
    }

    //info del producto

    try {
      await this.loadProduct();
    } catch (error) {
      this.router.navigate(['/500error']);
    }

    //info del vendedor

    try {
      await this.loadSeller();
    } catch (error) {
      this.router.navigate(['/500error']);
    }
  }

  async loadProduct(){
    this.product.set( await lastValueFrom(this.articleService.getArticleById(Number(this.review()?.articulos_id))))
    // img

    try {
      this.photos.set(await lastValueFrom(this.photoService.getFotosByArticuloId(Number(this.product()?.id))));
    } catch (error) {
      this.router.navigate(['/500error']);
    }
  }
  async loadSeller(){
    this.seller.set(await lastValueFrom(this.userService.getUserById((this.product()!.usuarios_id).toString())))
  }
}
