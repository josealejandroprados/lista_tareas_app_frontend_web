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

  saveCredentials(user:any){
    this.cookie.set('user',user.usuario);
    this.cookie.set('token', user.token);
    this.cookie.set('rol', user.rol);
  }

  deleteCredentials(){
    this.cookie.deleteAll();
  }

}
