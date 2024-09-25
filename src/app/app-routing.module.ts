import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './shared/guard/log-guard';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {
    path:'',
    loadChildren: () => import('./modules/auth/auth.module').then(
      m => m.AuthModule
    )
  },
  {
    path:'',
    loadChildren: () => import('./modules/welcome/welcome.module').then(
      m => m.WelcomeModule
    ),
    canActivate: [LoginGuard]
  },
  {
    path:'',
    loadChildren: () => import('./modules/add/add.module').then(
      m => m.AddModule
    ),
    canActivate: [LoginGuard]
  },
  {
    path:'',
    loadChildren: () => import('./modules/contact/contact.module').then(
      m => m.ContactModule
    )
  },
  {
    path:'',
    loadChildren: () => import('./modules/update/update.module').then(
      m => m.UpdateModule
    ),
    canActivate: [LoginGuard]
  },
  {path:'**', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
