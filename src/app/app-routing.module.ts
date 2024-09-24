import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    )
  },
  {
    path:'',
    loadChildren: () => import('./modules/add/add.module').then(
      m => m.AddModule
    )
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
    )
  },
  {path:'**', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
