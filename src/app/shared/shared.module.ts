import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    MenuNavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuNavComponent,
    FooterComponent
  ]
})
export class SharedModule { }
