import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { AddTaskComponent } from './components/add-task/add-task.component';


@NgModule({
  declarations: [
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    AddRoutingModule
  ]
})
export class AddModule { }
