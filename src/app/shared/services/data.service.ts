import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:3000';

  constructor(
    private http:HttpClient
  ){}

  // obtener todos los registros de tareas
  getTasks(){
    return this.http.get<any>(`${this.baseUrl}/gettasks`);
  }

  // obtener una tarea con su id
  getTask(id:string){
    return this.http.get<any>(`${this.baseUrl}/gettask/${id}`);
  }

  // agregar una tarea
  addTask(task:any){
    return this.http.post<any>(`${this.baseUrl}/addtask`,task);
  }

  // actualizar una tarea
  updateTask(task:any){
    return this.http.put<any>(`${this.baseUrl}/updatetask`,task);
  }

  // eliminar una tarea
  deleteTask(id:string){
    return this.http.delete<any>(`${this.baseUrl}/deletetask/${id}`);
  }
}
