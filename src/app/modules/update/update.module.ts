import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRoutingModule } from './update-routing.module';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    UpdateTaskComponent
  ],
  imports: [
    CommonModule,
    UpdateRoutingModule,
    ReactiveFormsModule,
    SharedModule
]
})
export class UpdateModule { }
