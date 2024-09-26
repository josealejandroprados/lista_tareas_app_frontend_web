import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalCargaInicialComponent } from 'src/app/shared/components/modal-carga-inicial/modal-carga-inicial.component';
import { ModalCargaComponent } from 'src/app/shared/components/modal-carga/modal-carga.component';
import { ModalConsultaComponent } from 'src/app/shared/components/modal-consulta/modal-consulta.component';
import { ModalConsulta } from 'src/app/shared/models/modal.consulta.model';
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
  idSelected!:string;

  // modelo de modal de eliminar tarea
  modalDelete:ModalModel = {
    title: 'Eliminar Tarea',
    hab_btn: false,
    textoBodyModal: '',
    textoBtn: 'Aceptar'
  }
  // accedo al componente hijo modal-carga
  @ViewChild(ModalCargaComponent) modalAccion!:ModalCargaComponent;

  // modelo de modalConsulta para eliminacion de tarea
  modalQueryDelete:ModalConsulta = {
    title: 'Eliminar Tarea',
    textoBodyModal: '¿Estás seguro que deseas eliminar la tarea?',
  }
  // accedo al componente hijo modal-consulta
  @ViewChild(ModalConsultaComponent) modalConsult!:ModalConsultaComponent;

  // accedo al componente hijo modal-carga-inicial
  @ViewChild(ModalCargaInicialComponent) modalInicial!:ModalCargaInicialComponent;

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
        this.modalInicial.cerrarModal();
      }
      else{
        console.log('error al obtener las tareas');
        this.modalInicial.cerrarModal();
      }
    });
  }

  consultaEliminarTarea(id:string){
    // guardo el id de la tarea en la que hice click para eliminar
    this.idSelected = id;


    // abrir modal de consulta
    this.modalConsult.abrirModalConsulta();
  }

  // eliminar tarea
  eliminarTarea(){
    this.modalDelete.textoBodyModal = 'Eliminando tarea...';
    // abrir modal
    this.modalAccion.abrirModal();

    // llamo al servicio
    this.data.deleteTask(this.idSelected).subscribe(resultado => {
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
