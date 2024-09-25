import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formRegister = new FormGroup({
    'nombre': new FormControl('',Validators.required),
    'apellido': new FormControl('',Validators.required),
    'email': new FormControl('',[Validators.required, Validators.email]),
    'password': new FormControl('',Validators.required),
  });

  constructor(
    private router:Router,
    private auth:AuthService
  ){}

  registrar(){
    if(this.formRegister.valid){
      // llamo al servicio
      this.auth.register(this.formRegister.value).subscribe(resultado => {
        if(resultado.message=='exito'){
          alert('registro realizado con exito');
          this.router.navigate(['login']);
        }
        else{
          alert('ha ocurrido un error');
        }
      });
    }
  }


  //getters
  get nombre(){
    return this.formRegister.get('nombre') as FormControl;
  }
  get apellido(){
    return this.formRegister.get('apellido') as FormControl;
  }
  get email(){
    return this.formRegister.get('email') as FormControl;
  }
  get password(){
    return this.formRegister.get('password') as FormControl;
  }
}
