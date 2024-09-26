import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ModalCargaComponent } from './components/modal-carga/modal-carga.component';
import { ModalConsultaComponent } from './components/modal-consulta/modal-consulta.component';
import { ModalCargaInicialComponent } from './components/modal-carga-inicial/modal-carga-inicial.component';



@NgModule({
  declarations: [
    MenuNavComponent,
    FooterComponent,
    ModalCargaComponent,
    ModalConsultaComponent,
    ModalCargaInicialComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuNavComponent,
    FooterComponent,
    ModalCargaComponent,
    ModalConsultaComponent,
    ModalCargaInicialComponent
  ]
})
export class SharedModule { }
