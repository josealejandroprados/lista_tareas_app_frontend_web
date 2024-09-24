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

  private obtenerTareas(){
    this.tasks = [];

    this.data.getTasks().subscribe(datos => {
      this.tasks = datos.tasks;
      console.log(this.tasks)
    });
  }
}
