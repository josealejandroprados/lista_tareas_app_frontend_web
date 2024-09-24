import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
      // llamo al servicio para actualizar la tarea
      this.data.updateTask(this.formUpdateTask.value,this.id).subscribe(resultado => {
        if(resultado.message=='exito'){
          alert('Tarea modificada con exito');
          this.router.navigate(['/home']);
        }
        else{
          alert('ha ocurrido un error, no se pudo modificar la tarea');
        }
      });
    }
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
