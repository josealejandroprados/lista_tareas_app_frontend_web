import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/shared/models/task.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  tasks:TaskModel[]=[];

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
    // llamo al servicio
    this.data.deleteTask(id).subscribe(resultado => {
      if(resultado.message=='exito'){
        alert('tarea eliminada con exito');

        // obtener tareas
        this.obtenerTareas();
      }
      else{
        alert('error al eliminar la tarea');
      }
    });
  }
}
