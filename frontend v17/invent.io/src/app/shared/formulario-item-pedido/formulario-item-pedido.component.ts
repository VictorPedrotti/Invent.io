import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder, Form } from '@angular/forms';
import { ItemPedido, Produto } from '../../core/types/types';
import { ProdutoService } from '../../core/services/produto.service';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario-item-pedido',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CommonModule,
    InputNumberModule,
    ButtonModule
  ],
  templateUrl: './formulario-item-pedido.component.html',
  styleUrl: './formulario-item-pedido.component.scss'
})
export class FormularioItemPedidoComponent implements OnInit, OnChanges {

  @Input() itemPedido!: ItemPedido;
  @Input() isEditMode = false;
  produtos: Produto[] = []
  submitted: boolean = false;
  itemPedidoForm!: FormGroup
  @Output() salvar = new EventEmitter<ItemPedido>();

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buscaProdutos();
    this.itemPedidoForm = this.formBuilder.group({
      pedido_id: [null],
      produto_id: [null, Validators.required],
      quantidade: [0, Validators.required],
      precoUnitario: [0]
    })    
  }

  buscaProdutos() {
    this.produtoService.obterTodos().subscribe((listaProdutos) => {
      this.produtos = listaProdutos   
    })
  }

  salvarForm() {
    if (this.itemPedidoForm.valid) {
      const pedidoId = Number(this.route.snapshot.paramMap.get('id'));
      const produtoId = this.itemPedidoForm.get('produto_id')?.value;
      const produtoSelecionado = this.produtos.find(produto => produto.id === produtoId);
      if (produtoSelecionado) {
        this.itemPedidoForm.get('precoUnitario')?.setValue(produtoSelecionado.preco, { emitEvent: false });
        this.itemPedidoForm.get('pedido_id')?.setValue(pedidoId);
      }
      this.salvar.emit(this.itemPedidoForm.value);
    }
  }

  limpar() {
    this.itemPedidoForm.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemPedido'] && this.itemPedido) {
      this.itemPedidoForm.patchValue({
        ...this.itemPedido
      });
    }
  }

}
