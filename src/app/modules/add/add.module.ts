import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    AddRoutingModule,
    ReactiveFormsModule,
    SharedModule
]
})
export class AddModule { }
