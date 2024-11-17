import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProdutoComponent } from './formulario-produto.component';

describe('FormularioProdutoComponent', () => {
  let component: FormularioProdutoComponent;
  let fixture: ComponentFixture<FormularioProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioProdutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
