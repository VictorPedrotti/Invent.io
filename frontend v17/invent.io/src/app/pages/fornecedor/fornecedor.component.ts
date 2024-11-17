import { MenuSuperiorComponent } from "../../shared/menu-superior/menu-superior.component";
import { MenuLateralComponent } from "../../shared/menu-lateral/menu-lateral.component";

import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SortEvent } from 'primeng/api';
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmationDialogComponent } from "../../shared/confirmation-dialog/confirmation-dialog.component";
import { Fornecedor } from "../../core/types/types";
import { FornecedorService } from "../../core/services/fornecedor.service";
import { FormularioFornecedorComponent } from "../../shared/formulario-fornecedor/formulario-fornecedor.component";
import { TradutorService } from "../../core/services/tradutor.service";

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    MenuLateralComponent,
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    DialogComponent,
    ConfirmationDialogComponent,
    ToastModule,
    FormularioFornecedorComponent
],
  providers: [MessageService],
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.scss'
})
export class FornecedorComponent implements OnInit{
  fornecedores: Fornecedor[] = [];
  filtroPesquisa: string = '';
  dialogVisible: boolean = false;
  isEditMode = false;
  fornecedorSelecionado!: Fornecedor;
  @ViewChild(FormularioFornecedorComponent) formularioFornecedorComponent!: FormularioFornecedorComponent;
  @ViewChild(ConfirmationDialogComponent) confirmDialog!: ConfirmationDialogComponent;

  constructor(
    private messageService: MessageService,
    private fornecedorService: FornecedorService,
    private tradutorService: TradutorService,
  ) {}

  ngOnInit(): void {
    this.buscaFornecedor();
    this.tradutorService.setTranslation();
  }

  abrirDialog() {
    this.isEditMode = false;
    if (this.formularioFornecedorComponent) {
      this.formularioFornecedorComponent.limpar();
    }
    this.dialogVisible = true; 
  }
  
  limpar(table: Table) {
    table.clear();
    this.filtroPesquisa = ''
  }

  editaFornecedor(fornecedor: Fornecedor) {
    this.isEditMode = true;
    this.fornecedorSelecionado = fornecedor;
    this.dialogVisible = true;
  }

  abrirConfirmacaoExclusao(fornecedor: Fornecedor) {
    this.fornecedorSelecionado = fornecedor;
    this.confirmDialog.message = `Tem certeza que deseja excluir o fornecedor ${fornecedor.nome}?`;
    this.confirmDialog.open();
  }

  deletaFornecedor() {
    this.fornecedorService.excluirRegistro(this.fornecedorSelecionado.id).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Excluir', detail: 'Fornecedor excluído com sucesso' });
        this.buscaFornecedor(); 
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Excluir', detail: 'Erro ao excluir Fornecedor'})
      }
    })
  }

  buscaFornecedor() {
    this.fornecedorService.obterTodos().subscribe((listaFornecedores) => {
      this.fornecedores = listaFornecedores;
    })  
  }

  salvarFornecedor(fornecedorData: Fornecedor) {
    if (this.isEditMode) {
      const fornecedorEditado = { ...fornecedorData, id: this.fornecedorSelecionado.id}
      this.fornecedorService.editarRegistro(fornecedorEditado).subscribe({
        next: res => {
          this.messageService.add({ severity: 'success', summary: 'Atualização', detail: 'Fornecedor atualizado com sucesso'})
          this.buscaFornecedor();
          this.dialogVisible = false;
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Atualização', detail: 'Erro ao atualizar Fornecedor'})
        }
      })
    } else {
      this.fornecedorService.salvarNovo(fornecedorData).subscribe({
        next: res => {
          this.messageService.add({ severity: 'success', summary: 'Adicionar', detail: 'Fornecedor adicionado com sucesso'})
          this.buscaFornecedor();
          this.dialogVisible = false;
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Adicionar', detail: 'Erro ao adicionar Fornecedor'})  
          this.dialogVisible = false;
        }
      })
    }  
  }

  customSort(event: any) {

  }
}
