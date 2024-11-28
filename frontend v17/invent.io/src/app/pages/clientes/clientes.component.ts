import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Cliente, Pedido } from '../../core/types/types';
import { MessageService } from 'primeng/api';
import { MenuSuperiorComponent } from "../../shared/menu-superior/menu-superior.component";
import { MenuLateralComponent } from "../../shared/menu-lateral/menu-lateral.component";
import { ClienteService } from '../../core/services/cliente.service';
import { TradutorService } from '../../core/services/tradutor.service';
import { FormularioClienteComponent } from '../../shared/formulario-cliente/formulario-cliente.component';
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { ConfirmationDialogComponent } from "../../shared/confirmation-dialog/confirmation-dialog.component";
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    MenuSuperiorComponent,
    MenuLateralComponent,
    DialogComponent,
    ToastModule,
    FormularioClienteComponent,
    ConfirmationDialogComponent,
    CommonModule
],
  providers: [MessageService],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit{
  clientes: Cliente[] = [];
  clienteSelecionado!: Cliente;
  pedidos: Pedido[] = [];
  filtroPesquisa: string = '';
  dialogVisible: boolean = false;
  historicoAberto: boolean = false;
  isEditMode = false;
  @ViewChild(FormularioClienteComponent) formularioClienteComponent!: FormularioClienteComponent;
  @ViewChild(ConfirmationDialogComponent) confirmDialog!: ConfirmationDialogComponent;

  constructor (
    private clienteService: ClienteService,
    private tradutorService: TradutorService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscaClientes();
    this.tradutorService.setTranslation();
  }

  abrirDialog() {
    this.isEditMode = false;
    if (this.formularioClienteComponent) {
      this.formularioClienteComponent.limpar();
    }
    this.dialogVisible = true; 
  }

  abreHistoricoDeCompra(cliente: Cliente) {
    this.router.navigate([`clientes/${cliente.id}/pedido`]);
  }

  fecharHistorico() {
    this.historicoAberto = false;
  }
  
  limpar(table: Table) {
    table.clear();
    this.filtroPesquisa = ''
  }
  
  buscaClientes() {
    this.clienteService.obterTodos().subscribe((listaClientes) => {
      this.clientes = listaClientes;
    })
  }

  editaCliente(cliente: Cliente) {
    this.isEditMode = true;
    this.clienteSelecionado = cliente;
    this.dialogVisible = true;
  }

  abrirConfirmacaoExclusao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
    this.confirmDialog.message = `Tem certeza que deseja excluir o cliente ${cliente.nome}?`;
    this.confirmDialog.open();
  }

  salvarCliente (clienteData: Cliente) {
    if (this.isEditMode) {
      const clienteEditado = { ...clienteData, id: this.clienteSelecionado.id}
      this.clienteService.editarRegistro(clienteEditado).subscribe({
        next: res => {
          this.messageService.add({ severity: 'success', summary: 'Atualização', detail: 'Cliente atualizado com sucesso'})
          this.buscaClientes();
          this.dialogVisible = false;
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Atualização', detail: 'Erro ao atualizar cliente'})
        }
      })
    } else {
      this.clienteService.salvarNovo(clienteData).subscribe({
        next: res => {
          this.messageService.add({ severity: 'success', summary: 'Adicionar', detail: 'Cliente adicionado com sucesso'})
          this.buscaClientes();
          this.dialogVisible = false;
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Adicionar', detail: 'Erro ao adicionar cliente'})  
          this.dialogVisible = false;
        }
      })
    }    
  }

  deletaProduto () {
    this.clienteService.excluirRegistro(this.clienteSelecionado.id).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Excluir', detail: 'Cliente excluído com sucesso' });
        this.buscaClientes(); 
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Excluir', detail: 'Erro ao excluir cliente'})
      }
    })
  }

}
