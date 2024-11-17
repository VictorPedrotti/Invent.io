import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { Fornecedor } from '../../core/types/types';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-formulario-fornecedor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    InputMaskModule,
    InputTextareaModule,
    ButtonModule
  ],
  templateUrl: './formulario-fornecedor.component.html',
  styleUrl: './formulario-fornecedor.component.scss'
})
export class FormularioFornecedorComponent implements OnInit, OnChanges{
 
  @Input() fornecedor!: Fornecedor;
  @Input() isEditMode = false;
  submitted: boolean = false;
  fornecedorForm!: FormGroup
  mask: string = '';
  @Output() salvar = new EventEmitter<Fornecedor>();

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.fornecedorForm = this.formBuilder.group({
      nome: [null, Validators.required],
      cnpj: ["", Validators.required],
      contato: ["", Validators.required],
      endereco: [null],
    })  
  }

  limpar() {
    this.fornecedorForm.reset();
  }

  salvarForm() {
    if (this.fornecedorForm.valid) {
      this.salvar.emit(this.fornecedorForm.value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fornecedor'] && this.fornecedor) {
      this.fornecedorForm.patchValue({
        ...this.fornecedor
      });
    }
  }
}
