import { Component, computed, inject, input } from '@angular/core';
import { NavStepOptions } from './nav-step.config';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'organism-nav-step',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-step.html',
  styleUrl: './nav-step.css',
})
export class NavStep {
  public steps      = input<NavStepOptions[]>([{name:"1",label:"DETALLES",query_param:"detail"}, {name:"2",label:"PRECIO",query_param:"price"},{name:"3",label:"FOTOS",query_param:"photo"}]);
  public stack      = input<boolean>(false);

  public nextStep = input(0)
  public previousStep = input(0)

  private activatedRoute = inject(ActivatedRoute);
  
  protected activeSteps = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map(params => {
        const parameters = params.getAll('step')
        return parameters;
      })
    ),
    { initialValue: [] as string[] }
  );

  protected isStepActive(query_param: string): boolean {
    console.log(this.activeSteps().includes(query_param))
    return this.activeSteps().includes(query_param);
  }
}
