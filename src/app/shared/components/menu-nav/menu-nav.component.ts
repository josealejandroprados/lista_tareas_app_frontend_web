import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent {

  enlace_linkedIn = 'https://www.linkedin.com/in/jos%C3%A9-alejandro-prados-70930b169/';

  enlace_github_proyecto = 'https://github.com/josealejandroprados?tab=repositories';

  constructor(
    private auth:AuthService
  ){}

  // metodo que devuelve true o false si está o no logueado 
  estalogueado(){
    return this.auth.estalogueado();
  }

  // metodo que devuelve el usuario almacenado en la cookie
  getUser(){
    return this.auth.getUser();
  }

  consultaAcciones(accion:string){}

}
