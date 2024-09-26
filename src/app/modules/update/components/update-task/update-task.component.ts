import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalCargaComponent } from 'src/app/shared/components/modal-carga/modal-carga.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { TaskModel } from 'src/app/shared/models/task.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit{

  id!:string;

  formUpdateTask = new FormGroup({
    'name': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    'state': new FormControl('')
  });

  // modelo de modal de actualizar/modificar tarea
  modalUpdate:ModalModel = {
    title: 'Modificar Tarea',
    hab_btn: false,
    textoBodyModal: '',
    textoBtn: 'Aceptar'
  }

  // accedo al componente hijo modal-carga
  @ViewChild(ModalCargaComponent) modalAccion!:ModalCargaComponent;
  
  ngOnInit(): void {
    // obtengo el id como parametro de ruta
    this.activRout.params.subscribe(params => this.id = params['id']);

    this.obtenerTarea();
  }

  constructor(
    private data:DataService,
    private router:Router,
    private activRout:ActivatedRoute
  ){}

  // metodo para actualizar tarea llamado desde el formulario (submit)
  updateTask(){
    if(this.formUpdateTask.valid){
      this.modalUpdate.textoBodyModal = 'Modificando tarea...';
      // abrir modal
      this.modalAccion.abrirModal();

      // llamo al servicio para actualizar la tarea
      this.data.updateTask(this.formUpdateTask.value,this.id).subscribe(resultado => {
        if(resultado.message=='exito'){
          this.modalUpdate.textoBodyModal = 'Tarea modificada con exito';
          this.modalUpdate.hab_btn = true;
        }
        else{
          this.modalUpdate.textoBodyModal = 'Ha ocurrido un error, no se pudo modificar la tarea';
          this.modalUpdate.hab_btn = true;
        }
      });
    }
  }

  aceptar(){
    // verifico si la tarea se modificó con éxito
    if(this.modalUpdate.textoBodyModal=='Tarea modificada con exito'){
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
    this.modalUpdate.textoBodyModal = '';
    this.modalUpdate.hab_btn = false;
  }

  private obtenerTarea(){
    // obtengo la tarea => llamo al servicio
    this.data.getTask(this.id).subscribe(datos => {
      if(datos.message=='exito'){
        // llamo al metodo para establecer los valores iniciales 
        this.valoresIniciales(datos.task);
      }
    });
  }

  private valoresIniciales(task:TaskModel){
    this.formUpdateTask.setValue({
      'name': task.name,
      'description': task.description,
      'state': task.state
    });
  }

}
