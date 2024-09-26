import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:3000';

  constructor(
    private http:HttpClient,
    private auth:AuthService
  ){}

  // obtener todos los registros de tareas
  getTasks(){
    return this.http.get<any>(`${this.baseUrl}/gettasks/${this.auth.getIdUser()}`);
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
  updateTask(task:any, id:string){
    return this.http.put<any>(`${this.baseUrl}/updatetask/${id}`,task);
  }

  // eliminar una tarea
  deleteTask(id:string){
    return this.http.delete<any>(`${this.baseUrl}/deletetask/${id}`);
  }

  // eliminar todas las tareas
  deleteAllTasks(){
    return this.http.delete<any>(`${this.baseUrl}/deletealltasks/${this.auth.getIdUser()}`);
  }
}
