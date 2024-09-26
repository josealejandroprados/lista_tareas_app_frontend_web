import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCargaComponent } from './modal-carga.component';

describe('ModalCargaComponent', () => {
  let component: ModalCargaComponent;
  let fixture: ComponentFixture<ModalCargaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCargaComponent]
    });
    fixture = TestBed.createComponent(ModalCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
