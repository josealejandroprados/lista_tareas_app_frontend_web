import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(
    private http:HttpClient
  ) { }

  // registrar usuario
  register(user:any){
    return this.http.post<any>(`${this.baseUrl}/register`,user);
  }

  // iniciar sesión/login
  login(user:any){
    return this.http.post<any>(`${this.baseUrl}/login`,user);
  }
}
