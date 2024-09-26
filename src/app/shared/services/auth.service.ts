import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://lista-tareas-app-backend.vercel.app';

  constructor(
    private http:HttpClient,
    private cookie:CookieService
  ) { }

  // registrar usuario
  register(user:any){
    return this.http.post<any>(`${this.baseUrl}/register`,user);
  }

  // iniciar sesión/login
  login(user:any){
    return this.http.post<any>(`${this.baseUrl}/login`,user);
  }

  // metodo para guardar las credenciales luego de hacer login
  saveCredentials(user:any){
    this.cookie.set('user',user.usuario);
    this.cookie.set('token', user.token);
    this.cookie.set('rol', user.rol);
    this.cookie.set('id', user.id);
  }

  // metodo para eliminar todas las credenciales
  deleteCredentials(){
    this.cookie.deleteAll();
  }

  // metodo que devuelve true si existe un token, es decir si estoy logueado
  estalogueado(){
    return this.cookie.get('token') ? true : false;
  }

  // obtener usuario
  getUser(){
    return this.cookie.get('user');
  }

  // metodo que retorna el id del usuario guardado en cookies
  getIdUser(){
    return this.cookie.get('id');
  }
  
  // cerrar sesión/logout
  logout(){
    // eliminar cookies
    this.deleteCredentials();
  }

  // eliminar cuenta de usuario
  deleteAccount(){
    return this.http.delete<any>(`${this.baseUrl}/deleteaccount/${this.cookie.get('id')}`);
  }

  // metodo para verificar si un email está disponible para registro
  verifyEmailAvailable(email:string){
    return this.http.get<any>(`${this.baseUrl}/emailAvailable/${email}`).pipe(
      map(respuesta => respuesta.available)
    );
  }
}
