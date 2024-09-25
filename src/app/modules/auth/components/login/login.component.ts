import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formlogin = new FormGroup({
    'email': new FormControl('',[Validators.required,Validators.email]),
    'password': new FormControl('',Validators.required)
  });

  constructor(
    private router:Router,
    private auth:AuthService
  ){}

  iniciar(){
    if(this.formlogin.valid){
      // llamo al servicio
      this.auth.login(this.formlogin.value).subscribe(resultado => {
        if(resultado.auth){
          // inicio de sesion con exito

          // guardar usuario y token en cookies
          this.auth.saveCredentials(resultado);

          alert('inicio de sesión realizado con exito');

          this.router.navigate(['home']);
        }
        else{
          alert(resultado.message);
        }
      });
    }
  }

  // getters
  get email(){
    return this.formlogin.get('email') as FormControl;
  }
  get password(){
    return this.formlogin.get('password') as FormControl;
  }
}
