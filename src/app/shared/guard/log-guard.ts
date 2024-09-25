import { inject } from "@angular/core"
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const LoginGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if(auth.estalogueado()){
        return true;
    }
    else{
        router.navigate(['/login']);
        return false;
    }
}