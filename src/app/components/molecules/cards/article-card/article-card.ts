import { Component, input } from '@angular/core';
import { ButtonIcon } from '../../../atoms/button-icon/button-icon';
import { Badge } from '../../../atoms/badge/badge';
import { BadgeCondition } from '../../../atoms/badge/badge.types';
import { ArticleCardVariant } from './article-card.config';

@Component({
  selector: 'molecule-article-card',
  imports: [Badge, ButtonIcon],
  templateUrl: './article-card.html',
  styleUrl: './article-card.css',
})
export class ArticleCard {
  public variant  = input<ArticleCardVariant>('minimal')
  public like     = input<boolean>(true);
  public state    = input<BadgeCondition>('Como nuevo');
  public img      = input<string>("https://placehold.co/400x200");
  public price    = input<number>(5070);
  public name     = input<string>("Article Name");
  public location = input<string>("Madrid");
  
}
