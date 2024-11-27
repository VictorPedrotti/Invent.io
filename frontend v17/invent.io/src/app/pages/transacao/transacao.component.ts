import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MenuSuperiorComponent } from "../../shared/menu-superior/menu-superior.component";
import { MenuLateralComponent } from "../../shared/menu-lateral/menu-lateral.component";
import { ConfirmationDialogComponent } from "../../shared/confirmation-dialog/confirmation-dialog.component";
import { Produto, Transacao } from '../../core/types/types';
import { CommonModule } from '@angular/common';
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { FormularioTransacaoComponent } from "../../shared/formulario-transacao/formulario-transacao.component";
import { TransacaoService } from '../../core/services/transacao.service';
import { ProdutoService } from '../../core/services/produto.service';
import { TradutorService } from '../../core/services/tradutor.service';

@Component({
  selector: 'app-transacao',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    MenuLateralComponent,
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ToastModule,
    ConfirmationDialogComponent,
    CommonModule,
    DialogComponent,
    FormularioTransacaoComponent
],
  providers: [MessageService],
  templateUrl: './transacao.component.html',
  styleUrl: './transacao.component.scss'
})
export class TransacaoComponent implements OnInit{
  transacoes: Transacao[] = [];
  transacao!: Transacao[];
  produtos: Produto[] = [];
  filtroPesquisa: string = '';
  dialogVisible: boolean = false;
  isEditMode = false;
  transacaoSelecionada!: Transacao;
  @ViewChild(ConfirmationDialogComponent) confirmDialog!: ConfirmationDialogComponent;
  @ViewChild(FormularioTransacaoComponent) formularioTransacaoComponent!: FormularioTransacaoComponent;
  
  constructor(
    private transacaoService: TransacaoService,
    private messageService: MessageService,
    private produtoService: ProdutoService,
    private tradutorService: TradutorService
  ) {}

  ngOnInit(): void {
    this.buscaProdutos();
    this.buscaTransacoes();
    this.tradutorService.setTranslation();
  }

  limpar(table: Table) {
    table.clear();
    this.filtroPesquisa = ''
  }

  abrirDialog() {
    this.isEditMode = false;
    if (this.formularioTransacaoComponent) {
      this.formularioTransacaoComponent.limpar();
    }
    this.dialogVisible = true;
  }

  editaTransacao(transacao: Transacao) {
    this.isEditMode = true;
    this.transacaoSelecionada = transacao;
    this.dialogVisible = true;
  }

  abrirConfirmacaoExclusao(transacao: Transacao) {
    this.transacaoSelecionada = transacao;
    this.confirmDialog.message = `Tem certeza que deseja excluir a transação de ID ${transacao.id}?`;
    this.confirmDialog.open();
  }

  deletaTransacao() {
    this.transacaoService.excluirRegistro(this.transacaoSelecionada.id).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Excluído', detail: 'Transação excluída com sucesso' });
        this.buscaTransacoes(); 
      },
      error: err => {
        this.messageService.add(err)
      }
    })
  }


  salvarTransacao(transacaoData: Transacao) {
    if (this.isEditMode) {
      const transacaoEditado = { ...transacaoData, id: this.transacaoSelecionada.id}
      this.transacaoService.editarRegistro(transacaoEditado).subscribe({
        next: res => {
          this.messageService.add({ severity: 'success', summary: 'Atualização', detail: 'transacao atualizado com sucesso'})
          this.buscaTransacoes();
          this.dialogVisible = false;
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Erro ao atualizar transacao', detail: err.message})
        }
      })
    } else {
      this.transacaoService.salvarNovo(transacaoData).subscribe({
        next: res => {
          this.messageService.add({ severity: 'success', summary: 'Adicionar', detail: 'transacao adicionado com sucesso'})
          this.buscaTransacoes();
          this.dialogVisible = false;
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Erro ao adicionar transacao', detail: err})  
          this.dialogVisible = false;
        }
      }) 
    }  
  }

  buscaTransacoes() {
    this.transacaoService.obterTodos().subscribe({
      next: (listaTransacao) => {
        this.transacoes = listaTransacao.map(transacao => ({
          ...transacao,
          produto: this.produtos.find(p => p.id === transacao.produto_id),
        }));
      },
      error: (err) => {
        this.messageService.add(err)  
      }
    })  
  }

  buscaProdutos() {
    this.produtoService.obterTodos().subscribe((listaProdutos) => {
      this.produtos = listaProdutos   
    })  
  }
}
