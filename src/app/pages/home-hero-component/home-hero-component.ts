import { Component } from '@angular/core';
import { NLInicioHero } from '../../components/no_logueado/nl-inicio-hero/nl-inicio-hero';
import { NLInicio } from '../../components/no_logueado/nl-inicio/nl-inicio';
import { Heading } from '../../components/no_logueado/heading/heading';
import { HomeBar } from '../../shared/home-bar/home-bar';
import { Buscador } from '../../shared/buscador/buscador';

@Component({
  selector: 'app-home-hero-component',
  imports: [NLInicioHero,NLInicio,Heading,HomeBar,Buscador],
  templateUrl: './home-hero-component.html',
  styleUrl: './home-hero-component.css',
})
export class HomeHeroComponent {
  user:any={};
  textoBusqueda:string='';
  placeholder:string='Buscar movil, portatil, tablet...';

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
      

    }
  }
}
