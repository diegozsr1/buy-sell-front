import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories-service';
import { ICategory } from '../../interfaces/i-category';

@Component({
  selector: 'app-home-bar',
  imports: [],
  templateUrl: './home-bar.html',
  styleUrl: './home-bar.css',
})
export class HomeBar {
  categorias: ICategory[] = [];
  categoriesService = inject(CategoriesService);

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit() {
    this.categoriesService.getAllCategories().subscribe((data) => {
      if (data.error) {
        console.log(data.error);
        return;
      } else {
        console.log(data);
        this.categorias = data;
        this.cd.detectChanges();
      }
    });
  }
}
