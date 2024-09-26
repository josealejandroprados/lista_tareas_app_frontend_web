import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ModalCargaComponent } from './components/modal-carga/modal-carga.component';



@NgModule({
  declarations: [
    MenuNavComponent,
    FooterComponent,
    ModalCargaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuNavComponent,
    FooterComponent,
    ModalCargaComponent
  ]
})
export class SharedModule { }
