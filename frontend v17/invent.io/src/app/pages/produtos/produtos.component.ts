import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { MenuSuperiorComponent } from "../../shared/menu-superior/menu-superior.component";
import { MenuLateralComponent } from "../../shared/menu-lateral/menu-lateral.component";
import { FormularioProdutoComponent } from "../../shared/formulario-produto/formulario-produto.component";
import { ProdutoService } from '../../core/services/produto.service';
import { Fornecedor, Produto } from '../../core/types/types';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { TradutorService } from '../../core/services/tradutor.service';
import { FornecedorService } from '../../core/services/fornecedor.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    InputTextModule,
    MenuSuperiorComponent,
    MenuLateralComponent,
    DialogComponent,
    FormularioProdutoComponent,
    ConfirmationDialogComponent
],
  providers: [MessageService],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit{
  produtos: Produto[] = [];
  fornecedores: Fornecedor[] = [];
  produtoSelecionado!: Produto;
  filtroPesquisa: string = '';
  lastSortedField: string | null = null;
  lastOrder: number = 1;
  dialogVisible: boolean = false;
  isEditMode = false;
  @ViewChild('dt1') dt1!: Table;
  @ViewChild(ConfirmationDialogComponent) confirmDialog!: ConfirmationDialogComponent;
  @ViewChild(FormularioProdutoComponent) formularioProdutoComponent!: FormularioProdutoComponent;

  constructor (
    private produtoService: ProdutoService, 
    private messageService: MessageService,
    private tradutorService: TradutorService,
    private fornecedorService: FornecedorService) {}

  ngOnInit(): void {
    this.buscaFornecedores();
    this.buscaProdutos();
    this.tradutorService.setTranslation();
  }

  limpar(table: Table) {
    table.clear();
    this.filtroPesquisa = ''
  }

abrirDialog() {
  this.isEditMode = false;
  if (this.formularioProdutoComponent) {
    this.formularioProdutoComponent.limpar();
  }
  this.dialogVisible = true;
}

editaProduto(produto: Produto) {
  this.isEditMode = true;
  this.produtoSelecionado = produto;
  this.dialogVisible = true;
}

  salvarProduto (produtoData: Produto) {
    if (this.isEditMode) {
      const produtoEditado = { ...produtoData, id: this.produtoSelecionado.id}
      this.produtoService.editarRegistro(produtoEditado).subscribe({
        next: res => {
          this.messageService.add({ severity: 'success', summary: 'Atualização', detail: 'Produto atualizado com sucesso'})
          this.buscaProdutos();
          this.dialogVisible = false;
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Erro ao atualizar produto', detail: err.message})
        }
      })
    } else {
      this.produtoService.salvarNovo(produtoData).subscribe({
        next: res => {
          this.messageService.add({ severity: 'success', summary: 'Adicionar', detail: 'Produto adicionado com sucesso'})
          this.buscaProdutos();
          this.dialogVisible = false;
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Erro ao adicionar produto', detail: err})  
          this.dialogVisible = false;
        }
      })
    }
  }

  abrirConfirmacaoExclusao(produto: Produto) {
    this.produtoSelecionado = produto;
    this.confirmDialog.message = `Tem certeza que deseja excluir o produto ${produto.nome}?`;
    this.confirmDialog.open();
  }

  deletaProduto () {
    this.produtoService.excluirRegistro(this.produtoSelecionado.id).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Excluído', detail: 'Produto excluído com sucesso' });
        this.buscaProdutos(); 
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'erro', detail: 'Erro ao excluir produto'})
      }
    })
  }

  buscaProdutos() {
    this.produtoService.obterTodos().subscribe((listaProdutos) => {
      this.produtos = listaProdutos.map(produto => ({
        ...produto,
        fornecedor: this.fornecedores.find(f => f.id === produto.fornecedor_id) 
      }));
    })  
  }

  buscaFornecedores() {
    this.fornecedorService.obterTodos().subscribe((listaFornecedores) => {
      this.fornecedores = listaFornecedores;
    })
  }
}
