import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FilterMatchMode, SelectItem, SortEvent } from 'primeng/api';
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { MenuSuperiorComponent } from "../../shared/menu-superior/menu-superior.component";
import { MenuLateralComponent } from "../../shared/menu-lateral/menu-lateral.component";
import { FormularioProdutoComponent } from "../../shared/formulario-produto/formulario-produto.component";
import { ProdutoService } from '../../core/services/produto.service';
import { Produto } from '../../core/types/types';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

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
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit{
  produtos: Produto[] = [];
  produtoSelecionado!: Produto;
  filtroPesquisa: string = '';
  lastSortedField: string | null = null;
  lastOrder: number = 1;
  matchModeOptions: SelectItem[];
  dialogVisible: boolean = false;
  @ViewChild('dt1') dt1!: Table;
  @ViewChild(ConfirmationDialogComponent) confirmDialog!: ConfirmationDialogComponent;

  constructor (private produtoService: ProdutoService, private messageService: MessageService) {
    this.matchModeOptions = [
      { label: 'Contém', value: FilterMatchMode.CONTAINS },
      { label: 'Começa com', value: FilterMatchMode.STARTS_WITH },
      { label: 'Igual a', value: FilterMatchMode.EQUALS },
      { label: 'Diferente de', value: FilterMatchMode.NOT_EQUALS }
    ]
  }

  ngOnInit(): void {
    this.buscaProdutos();
  }

  limpar(table: Table) {
    table.clear();
    this.filtroPesquisa = ''
  }

  customSort(event: SortEvent) {
    if (this.lastSortedField === event.field) {
        this.lastOrder = this.lastOrder === 1 ? -1 : 1;
    } else {
        this.lastOrder = 1;
    }
    this.lastSortedField = event.field ?? null;
    event.order = this.lastOrder;
    
    this.dt1.sortField = this.lastSortedField;
    this.dt1.sortOrder = this.lastOrder;

    this.sortTableData(event);
    this.dt1.reset();
}

sortTableData(event: SortEvent) {
    if (!event.data || !event.field) return;

    const field = event.field as keyof typeof event.data[0];
    const data = [...event.data];
    const order = event.order ?? 1;

    data.sort((data1, data2) => {
        let value1 = data1[field];
        let value2 = data2[field];
        let result = 0;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return order * result;
    });

    this.produtos = [...data];
}

  filtrarPesquisa(event: Event) {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.dt1.filterGlobal(target.value, 'contains');
    }
  }

  abrirDialog() {
    this.dialogVisible = true;
  }

  editaProduto (produto: Produto) {

  }

  abrirConfirmacaoExclusao(produto: Produto) {
    this.produtoSelecionado = produto;
    this.confirmDialog.message = `Tem certeza que deseja excluir o produto ${produto.nome}?`;
    this.confirmDialog.open();
  }

  deletaProduto () {
    this.produtoService.excluirRegistro(this.produtoSelecionado.id).toPromise()
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Excluído', detail: 'Produto excluído com sucesso' });
        this.buscaProdutos(); 
      })
  }

  buscaProdutos() {
    this.produtoService.obterTodos().subscribe((listaProdutos) => {
      this.produtos = listaProdutos;
    })  
  }
}
