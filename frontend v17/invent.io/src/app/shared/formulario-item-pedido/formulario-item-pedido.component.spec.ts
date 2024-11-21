import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioItemPedidoComponent } from './formulario-item-pedido.component';

describe('FormularioItemPedidoComponent', () => {
  let component: FormularioItemPedidoComponent;
  let fixture: ComponentFixture<FormularioItemPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioItemPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioItemPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
