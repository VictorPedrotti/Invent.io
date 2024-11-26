import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pedido, Produto, Transacao } from '../../core/types/types';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProdutoService } from '../../core/services/produto.service';
import { PedidoService } from '../../core/services/pedido.service';


@Component({
  selector: 'app-formulario-transacao',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule
  ],
  templateUrl: './formulario-transacao.component.html',
  styleUrl: './formulario-transacao.component.scss'
})
export class FormularioTransacaoComponent implements OnInit {

  @Input() transacao!: Transacao;
  @Input() isEditMode = false;
  produtos: Produto[] = [];
  pedidos: Pedido[] = [];
  submitted: boolean = false;
  transacaoForm!: FormGroup
  tipo: string[] = ['Entrada', 'Saída']
  @Output() salvar = new EventEmitter<Transacao>();

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.buscaPedidos();
    this.buscaProdutos();
    this.transacaoForm = this.formBuilder.group({
      data: [new Date(), Validators.required],
      tipo: ["", Validators.required],
      valor: ["", Validators.required],
      produto_id: [0],
      pedido_id: [null, Validators.required],
    })  
  }

  limpar() {
    this.transacaoForm.reset();
  }

  salvarForm() {
    if (this.transacaoForm.valid) {
      this.salvar.emit(this.transacaoForm.value);
    }
  }

  buscaProdutos() {
    this.produtoService.obterTodos().subscribe((listaProdutos) => {
      this.produtos = listaProdutos;   
    })
  }

  buscaPedidos() {
    this.pedidoService.obterTodos().subscribe((listaPedidos) => {
      this.pedidos = listaPedidos;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transacao'] && this.transacao) {
      this.transacaoForm.patchValue({
        ...this.transacao,
        pedido_id: this.transacao.pedido_id
      });

    }
  }

}
