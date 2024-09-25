import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private data:DataService,
    private router:Router,
    private auth:AuthService
  ){}

  addTask(){
    if(this.formAddTask.valid){
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
          alert('tarea agregada con exito');
          this.router.navigate(['home']);
        }
        else{
          alert('ha ocurrido un error al agregar la tarea');
        }
      });
    }
  }
}
