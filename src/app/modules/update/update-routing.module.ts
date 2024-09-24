import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateTaskComponent } from './components/update-task/update-task.component';

const routes: Routes = [
  {path:'updatetask/:id', component:UpdateTaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateRoutingModule { }
