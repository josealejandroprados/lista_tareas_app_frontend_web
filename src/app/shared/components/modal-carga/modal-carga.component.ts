import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalModel } from '../../models/modal.model';

declare var window:any;

@Component({
  selector: 'app-modal-carga',
  templateUrl: './modal-carga.component.html',
  styleUrls: ['./modal-carga.component.css']
})
export class ModalCargaComponent implements OnInit{

  @Input() modalAccion!:ModalModel;
  @Output() complete = new EventEmitter<void>();

  varModal:any;

  ngOnInit(): void {
    this.varModal = new window.bootstrap.Modal(
      document.getElementById('modal-accion')
    );
  }

  public abrirModal(){
    // abrir modal
    this.varModal.show();
  }

  public cerrarModal(){
    this.varModal.hide();
  }

  aceptar(){
    // cerrar modal
    this.cerrarModal();

    this.complete.emit();
  }
}
