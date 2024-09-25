import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

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
  
  // cerrar sesión/logout
  logout(){
    // eliminar cookies
    this.deleteCredentials();
  }

  // eliminar cuenta de usuario
  deleteAccount(){
    return this.http.delete<any>(`${this.baseUrl}/deleteaccount/${this.cookie.get('id')}`);
  }
}
