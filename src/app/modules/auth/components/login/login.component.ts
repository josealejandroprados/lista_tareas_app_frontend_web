import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalCargaComponent } from 'src/app/shared/components/modal-carga/modal-carga.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formlogin = new FormGroup({
    'email': new FormControl('',[Validators.required,Validators.email]),
    'password': new FormControl('',Validators.required)
  });

  // modelo de modal de registro
  modalLogin:ModalModel = {
    title: 'Iniciar Sesión',
    hab_btn: false,
    textoBodyModal: '',
    textoBtn: 'Aceptar'
  }

  // accedo al componente hijo modal-carga
  @ViewChild(ModalCargaComponent) modalAccion!:ModalCargaComponent;

  constructor(
    private router:Router,
    private auth:AuthService
  ){}

  iniciar(){
    if(this.formlogin.valid){
      this.modalLogin.textoBodyModal = 'Iniciando sesión...';
      // abrir modal
      this.modalAccion.abrirModal();

      // llamo al servicio
      this.auth.login(this.formlogin.value).subscribe(resultado => {
        if(resultado.auth){
          // inicio de sesion con exito

          // guardar usuario y token en cookies
          this.auth.saveCredentials(resultado);

          this.modalLogin.textoBodyModal = 'Inicio de sesión realizado con exito ¡Bienvenido!';
          this.modalLogin.hab_btn = true;
        }
        else{
          this.modalLogin.textoBodyModal = resultado.message;
          this.modalLogin.hab_btn = true;
        }
      });
    }
  }

  aceptar(){
    if(this.auth.estalogueado()){
      // reinicio variables de modal
      this.reinicioVariblesModal();

      // redirigir a home
      this.router.navigate(['/home']);
    }
    else{
      // reiniciar variables de modal, no redirigir
      this.reinicioVariblesModal();
    }
  }

  private reinicioVariblesModal(){
    // reiniciar variables del modalRegister
    this.modalLogin.hab_btn = false;
    this.modalLogin.textoBodyModal = '';
  }

  // getters
  get email(){
    return this.formlogin.get('email') as FormControl;
  }
  get password(){
    return this.formlogin.get('password') as FormControl;
  }
}
