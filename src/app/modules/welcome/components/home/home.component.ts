import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalCargaComponent } from 'src/app/shared/components/modal-carga/modal-carga.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { TaskModel } from 'src/app/shared/models/task.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  tasks:TaskModel[]=[];

  // modelo de modal de eliminar tarea
  modalDelete:ModalModel = {
    title: 'Eliminar Tarea',
    hab_btn: false,
    textoBodyModal: '',
    textoBtn: 'Aceptar'
  }

  // accedo al componente hijo modal-carga
  @ViewChild(ModalCargaComponent) modalAccion!:ModalCargaComponent;

  ngOnInit(): void {
    this.obtenerTareas();
  }

  constructor(
    private data:DataService
  ){}

  // metodo para obtener todas las tareas
  private obtenerTareas(){
    // iniciar el array como vacío
    this.tasks = [];

    // llamar al servicio para obtener las tareas
    this.data.getTasks().subscribe(datos => {
      if(datos.message=='exito'){
        // tareas obtenidas con exito
        this.tasks = datos.tasks;
      }
      else{
        console.log('error al obtener las tareas');
      }
    });
  }

  // eliminar tarea
  eliminarTarea(id:string){
    this.modalDelete.textoBodyModal = 'Eliminando tarea...';
    // abrir modal
    this.modalAccion.abrirModal();

    // llamo al servicio
    this.data.deleteTask(id).subscribe(resultado => {
      if(resultado.message=='exito'){
        // exito al eliminar la tarea
        // obtener tareas
        this.obtenerTareas();

        this.modalDelete.textoBodyModal = 'Tarea eliminada con exito';
        this.modalDelete.hab_btn = true;
      }
      else{
        this.modalDelete.textoBodyModal = 'Error al eliminar la tarea';
        this.modalDelete.hab_btn = true;
      }
    });
  }

  aceptar(){
    // reiniciar variables de modal
    this.modalDelete.textoBodyModal = '';
    this.modalDelete.hab_btn = false;
  }
}
