import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalConsulta } from '../../models/modal.consulta.model';
import { ModalModel } from '../../models/modal.model';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

declare var window:any;

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit{

  varModalAcciones:any;
  modalAcciones:ModalConsulta = {
    title:'',
    textoBodyModal:''
  };
  action:string='';

  varModalExecute:any;
  modalExecute:ModalModel={
    title:'',
    textoBodyModal:'',
    textoBtn:'Aceptar',
    hab_btn:false
  }

  // enlaces a linkedIn y GitHub
  enlace_linkedIn = 'https://www.linkedin.com/in/jos%C3%A9-alejandro-prados-70930b169/';
  enlace_github_proyecto = 'https://github.com/josealejandroprados?tab=repositories';

  constructor(
    private auth:AuthService,
    private router:Router,
    private data:DataService
  ){}

  ngOnInit(): void {
    this.varModalAcciones = new window.bootstrap.Modal(
      document.getElementById('modal-acciones')
    );

    this.varModalExecute = new window.bootstrap.Modal(
      document.getElementById('modal-execute-action')
    );
  }

  // metodo que devuelve true o false si está o no logueado 
  estalogueado(){
    return this.auth.estalogueado();
  }

  // metodo que devuelve el usuario almacenado en la cookie
  getUser(){
    return this.auth.getUser();
  }

  consultaAcciones(accion:string){
    this.action = accion;

    // verifico si la accion es logout o deleteAccount
    if(this.action=='logout'){
      // consultar al usuario si quiere hacer logout
      this.modalAcciones = {
        title: 'Cerrar Sesión',
        textoBodyModal: '¿Estás seguro que deseas cerrar sesión?'
      }
    }
    else{
      // consultar al usuario si quiere eliminar su cuenta
      this.modalAcciones = {
        title: 'Eliminar Cuenta',
        textoBodyModal: '¿Estás seguro que deseas eliminar tu cuenta?. ¡Esto eliminará todos tus registros!'
      }
    }

    // abrir modal
    this.varModalAcciones.show();
  }

  private logout(){
    // llamar al servicio para eliminar credenciales
    this.auth.logout();

    // redirigir a login
    this.router.navigate(['/login']);

    // recargar pagina luego de 200ms (Refresh Browser)
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  ok(){
    if(this.action=='logout'){
      // se aceptó hacer logout dando click en Aceptar en el modal de consulta

      // cerrar modal
      this.cerrarModalConsulta();

      // realizo el logout
      this.logout();
    }
    else{
      // se aceptó hacer deleteAccount dando click en Aceptar en el modal de consulta

      // cerrar modal de consulta
      this.cerrarModalConsulta();

      // modifico propiedades de modalExecute
      this.modalExecute.title = 'Eliminar Cuenta';
      this.modalExecute.textoBodyModal = 'Eliminando registros...';

      // abrir modal execute
      this.varModalExecute.show();

      // eliminar todas las tareas
      this.data.deleteAllTasks().subscribe(resultado => {
        if(resultado.message=='exito'){
          // exito al eliminar todos los registros => eliminar cuenta
          this.modalExecute.textoBodyModal = 'Eliminando cuenta...';

          // elimino cuenta
          this.auth.deleteAccount().subscribe(result => {
            if(result.message=='exito'){
              // cuenta de usuario eliminada con exito
              this.modalExecute.hab_btn = true;
              this.modalExecute.textoBodyModal = '¡Su cuenta ha sido eliminada con éxito!'
            }
            else{
              // error al eliminar cuenta de usuario
              this.modalExecute.hab_btn = true;
              this.modalExecute.textoBodyModal = 'Ha ocurrido un error al eliminar su cuenta';
            }
          });
        }
        else{
          // error al eliminar registros
          this.modalExecute.hab_btn = true;
          this.modalExecute.textoBodyModal = '¡Ha ocurrido un error! No se pudo eliminar su cuenta';
        }
      });
    }
  }

  aceptar(){
    // cerrar modal execute
    this.cerrarModalExecute();

    // llamar a logout para eliminar credenciales, redirigir a login y recargar pagina despues de 200ms
    this.logout();
  }

  cerrarModalExecute(){
    // cerrar modal execute
    this.varModalExecute.hide();
    // reiniciar variables de modal execute
    this.modalExecute.title = '';
    this.modalExecute.textoBodyModal = '';
    this.modalExecute.hab_btn = false;
    this.modalExecute.textoBtn = 'Aceptar';
  }

  cerrarModalConsulta(){
    // cierro modal acciones
    this.varModalAcciones.hide();

    // reiniciar variables del modalAcciones
    this.modalAcciones.textoBodyModal='';
    this.modalAcciones.title='';
  }
}
