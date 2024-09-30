import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalCargaComponent } from 'src/app/shared/components/modal-carga/modal-carga.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  // formulario reactivo de contacto
  formEmail = new FormGroup({
    'nombre': new FormControl('', Validators.required),
    'email_user': new FormControl('', [Validators.required,Validators.email]),
    'telefono': new FormControl(''),
    'asunto': new FormControl('',Validators.required),
    'mensaje': new FormControl('', Validators.required)
  });

  // modelo de modal de contacto
  modalContact:ModalModel = {
    title:'Contacto',
    hab_btn: false,
    textoBodyModal:'',
    textoBtn:'Ok'
  }

  // accedo al componente hijo ModalCarga
  @ViewChild(ModalCargaComponent) modal_accion!:ModalCargaComponent;

  constructor(
    private contact:ContactService,
    private router:Router
  ){}

  // metodo para enviar email
  enviarEmail(){
    if(this.formEmail.valid){
      // abrir modal
      this.modalContact.textoBodyModal = 'Enviando mensaje...';
      this.modal_accion.abrirModal();

      // llamo al servicio
      this.contact.sendEmail(this.formEmail.value).subscribe(resultado => {
        if(resultado.message=='exito'){
          // mensaje enviado con exito
          this.modalContact.textoBodyModal = '¡Su mensaje ha sido enviado con éxito!\nEn breve le estaré respondiendo \nmuchas gracias por comunicarse conmigo';
          this.modalContact.hab_btn = true;
        }
        else{
          // fallo al enviar el mensaje
          this.modalContact.textoBodyModal = '¡Ha ocurrido un error! \nNo se pudo enviar su mensaje, disculpe las molestias';
          this.modalContact.hab_btn = true;
        }
      });
    }
  }

  // metodo aceptar del modal luego de que el email se envió o falló
  aceptar(){
    this.modalContact.hab_btn = false;
    this.modalContact.textoBodyModal = '';
    this.router.navigate(['inicio']);
  }

  //getters
  get nombre(){
    return this.formEmail.get('nombre') as FormControl;
  }
  get email_user(){
    return this.formEmail.get('email_user') as FormControl;
  }
  get asunto(){
    return this.formEmail.get('asunto') as FormControl;
  }
  get mensaje(){
    return this.formEmail.get('mensaje') as FormControl;
  }
  
}
