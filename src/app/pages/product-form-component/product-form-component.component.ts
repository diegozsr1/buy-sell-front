import { Component, inject } from '@angular/core';
import { Button } from "../../components/atoms/button/button";
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-form-component',
  imports: [Button],
  templateUrl: './product-form-component.component.html',
  styleUrl: './product-form-component.component.css',
})
export class ProductFormComponentComponent {
  public readonly QUERYPARAM_DETAIL:   string = "detail"
  public readonly QUERYPARAM_PRICE:    string = "price"
  public readonly QUERYPARAM_PICTURES: string = "pictures"
  
   //Services
  private router = inject(Router);
   private actived_route = inject(ActivatedRoute);

  ngOnInit() { 
    this.router.navigate([], {
        queryParams: { tab: this.QUERYPARAM_DETAIL },
        queryParamsHandling: 'merge'  // conserva otros query params existentes
    })
  }


  protected activeTab = toSignal(
    this.actived_route.queryParamMap.pipe(
        map(params => params.get('tab'))
    ));
}
