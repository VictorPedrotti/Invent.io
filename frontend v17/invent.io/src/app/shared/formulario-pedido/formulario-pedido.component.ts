import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Cliente, Pedido } from '../../core/types/types';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { ClienteService } from '../../core/services/cliente.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-formulario-pedido',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule
  ],
  templateUrl: './formulario-pedido.component.html',
  styleUrl: './formulario-pedido.component.scss'
})
export class FormularioPedidoComponent {

  @Input() pedido!: Pedido;
  @Input() isEditMode = false;
  clientes: Cliente[] = []
  submitted: boolean = false;
  pedidoForm!: FormGroup
  status: string[] = ['Pendente', 'Concluído']
  @Output() salvar = new EventEmitter<Pedido>();

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this. buscaClientes();
    this.pedidoForm = this.formBuilder.group({
      data: [new Date(), Validators.required],
      status: ["", Validators.required],
      total: ["", Validators.required],
      cliente_id: [null],
    })  
  }

  limpar() {
    this.pedidoForm.reset();
  }

  salvarForm() {
    if (this.pedidoForm.valid) {
      this.salvar.emit(this.pedidoForm.value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pedido'] && this.pedido) {
      this.pedidoForm.patchValue({
        ...this.pedido
      });
    }
  }

  buscaClientes() {
    this.clienteService.obterTodos().subscribe((listaClientes) => {
      this.clientes = listaClientes;
    })
  }
}

