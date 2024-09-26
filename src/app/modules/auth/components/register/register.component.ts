import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalCargaComponent } from 'src/app/shared/components/modal-carga/modal-carga.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  emailAvailable:boolean = true;

  formRegister = new FormGroup({
    'nombre': new FormControl('',Validators.required),
    'apellido': new FormControl('',Validators.required),
    'email': new FormControl('',[Validators.required, Validators.email]),
    'password': new FormControl('',Validators.required),
  });

  // modelo de modal de registro
  modalRegister:ModalModel = {
    title: 'Registro de Usuario',
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

  registrar(){
    if(this.formRegister.valid){
      this.modalRegister.textoBodyModal = 'Verificando disponibilidad de email...';
      // abrir modal
      this.modalAccion.abrirModal();

      // verificar si el email ingresado por el usuario está disponible en la BBDD
      this.auth.verifyEmailAvailable(this.formRegister.value.email || '').subscribe(resultado => {
        if(resultado){
          this.modalRegister.textoBodyModal = 'Registrando usuario...';

          // si resultado = true => email si está disponible
          // realizar registro
          // llamo al servicio
          this.auth.register(this.formRegister.value).subscribe(resultado => {
            if(resultado.message=='exito'){
              this.modalRegister.textoBodyModal = 'Registro realizado con éxito';
              this.modalRegister.hab_btn = true;
            }
            else{
              this.modalRegister.textoBodyModal = '¡Ha ocurrido un error! No se pudo realizar el registro';
              this.modalRegister.hab_btn = true;
            }
          });
        }
        else{
          // si resultado = false => email no disponible
          // cerrar modal
          this.modalAccion.cerrarModal();

          this.reinicioVariblesModal();

          // activar alert
          this.emailAvailable = false;
        }
      });
      
    }
  }

  aceptar(){
    // verifico si el registro fue exitoso
    if(this.modalRegister.textoBodyModal=='Registro realizado con éxito'){
      // registro fue exitoso => reiniciar variables de modal y redirigir a login
      this.reinicioVariblesModal();

      this.router.navigate(['/login']);
    }
    else{
      // registro fallido => solo reiniciar variables de modal, no redirigir
      this.reinicioVariblesModal();
    }
    // 
  }

  private reinicioVariblesModal(){
    // reiniciar variables del modalRegister
    this.modalRegister.hab_btn = false;
    this.modalRegister.textoBodyModal = '';
  }

  /* metodo que cambia el valor de emailAvailable de false a true cuando el usuario escribe un nuevo
  email luego de que el primero que escribió resultó no disponible para registro
  esto es para ocultar el alert cuando el usuario escribe otro email
  */
  hideAlertEmailAvailable(){
    if(this.emailAvailable == false){
      this.emailAvailable = true;
    }
  }


  //getters
  get nombre(){
    return this.formRegister.get('nombre') as FormControl;
  }
  get apellido(){
    return this.formRegister.get('apellido') as FormControl;
  }
  get email(){
    return this.formRegister.get('email') as FormControl;
  }
  get password(){
    return this.formRegister.get('password') as FormControl;
  }
}
