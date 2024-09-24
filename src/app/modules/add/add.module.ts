import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    AddRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddModule { }
