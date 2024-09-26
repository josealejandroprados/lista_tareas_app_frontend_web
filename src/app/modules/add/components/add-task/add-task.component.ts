import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalCargaComponent } from 'src/app/shared/components/modal-carga/modal-carga.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { TaskModel } from 'src/app/shared/models/task.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  task!:TaskModel;

  formAddTask = new FormGroup({
    'name': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    'state': new FormControl('No iniciada')
  });

  // modelo de modal de agregar tarea
  modalAdd:ModalModel = {
    title: 'Agregar Tarea',
    hab_btn: false,
    textoBodyModal: '',
    textoBtn: 'Aceptar'
  }

  // accedo al componente hijo modal-carga
  @ViewChild(ModalCargaComponent) modalAccion!:ModalCargaComponent;

  constructor(
    private data:DataService,
    private router:Router,
    private auth:AuthService
  ){}

  // metodo para agregar tarea
  addTask(){
    if(this.formAddTask.valid){
      this.modalAdd.textoBodyModal = 'Agregando tarea...';
      // abrir modal
      this.modalAccion.abrirModal();

      // construyo la tarea
      this.task = {
        _id: '',
        name: this.formAddTask.value.name || '',
        description: this.formAddTask.value.description || '',
        state: this.formAddTask.value.state || '',
        user_id: this.auth.getIdUser(),
        createdAt: '',
        updatedAt: ''
      }

      // agregar tarea, llamo al servicio
      this.data.addTask(this.task).subscribe(resultado => {
        if(resultado.message=='exito'){
          this.modalAdd.textoBodyModal = 'Tarea agregada con exito';
          this.modalAdd.hab_btn = true;
        }
        else{
          this.modalAdd.textoBodyModal = 'Ha ocurrido un error al agregar la tarea';
          this.modalAdd.hab_btn = true;
        }
      });
    }
  }

  aceptar(){
    // verifico si la tarea se agregó con éxito
    if(this.modalAdd.textoBodyModal=='Tarea agregada con exito'){
      // tarea agregada con exito, reiniciar variables de modal y redirigir a home
      this.reiniciarVariablesModal()

      this.router.navigate(['/home']);
    }
    else{
      // error al agregar la tarea => reiniciar variables de modal, no redirigir
      this.reiniciarVariablesModal();
    }
  }

  private reiniciarVariablesModal(){
    // reinicio varibles de modal
    this.modalAdd.textoBodyModal = '';
    this.modalAdd.hab_btn = false;
  }
}
