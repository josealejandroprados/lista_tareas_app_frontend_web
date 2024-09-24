import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  formAddTask = new FormGroup({
    'name': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    'state': new FormControl('No iniciada')
  });

  constructor(
    private data:DataService,
    private router:Router
  ){}

  addTask(){
    if(this.formAddTask.valid){
      console.log(this.formAddTask.value);

      // agregar tarea, llamo al servicio
      this.data.addTask(this.formAddTask.value).subscribe(resultado => {
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
