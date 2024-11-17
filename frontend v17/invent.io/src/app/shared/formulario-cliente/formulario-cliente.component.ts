import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Cliente } from '../../core/types/types';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-formulario-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    InputTextareaModule,
    RadioButtonModule
  ],
  templateUrl: './formulario-cliente.component.html',
  styleUrl: './formulario-cliente.component.scss'
})
export class FormularioClienteComponent implements OnInit, OnChanges{
  
  clienteForm!: FormGroup;
  submitted: boolean = false;
  mask: string = '';
  @Input() cliente!: Cliente;
  @Output() salvar = new EventEmitter<Cliente>();

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.mask = '99.999.999/9999-99';
    this.clienteForm = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf_cnpj: ["", [Validators.required]],
      contato: ["", Validators.required],
      endereco: [null],
    })    	 
  }

  salvarForm() {
    if (this.clienteForm.valid) {
      this.salvar.emit(this.clienteForm.value);
    }
  }

  limpar() {
    this.clienteForm.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente'] && this.cliente) {
      this.clienteForm.patchValue({
        ...this.cliente
      });
    }
  }
}
