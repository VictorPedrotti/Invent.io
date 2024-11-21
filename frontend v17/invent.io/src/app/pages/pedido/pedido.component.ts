import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuSuperiorComponent } from "../../shared/menu-superior/menu-superior.component";
import { MenuLateralComponent } from "../../shared/menu-lateral/menu-lateral.component";
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Cliente, Pedido } from '../../core/types/types';
import { PedidoService } from '../../core/services/pedido.service';
import { ClienteService } from '../../core/services/cliente.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { MessageService } from 'primeng/api';
import { TradutorService } from '../../core/services/tradutor.service';
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { FormularioPedidoComponent } from "../../shared/formulario-pedido/formulario-pedido.component";
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    MenuLateralComponent,
    TableModule,
    ButtonModule,
    ConfirmationDialogComponent,
    DialogComponent,
    FormularioPedidoComponent,
    ToastModule,
    CommonModule
],
  providers: [MessageService],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.scss'
})
export class PedidoComponent implements OnInit{
  filtroPesquisa: string = '';
  pedidos: Pedido[] = [];
  clientes: Cliente[] = [];
  pedidoSelecionado!: Pedido;
  isEditMode = false;
  @ViewChild(ConfirmationDialogComponent) confirmDialog!: ConfirmationDialogComponent;
  @ViewChild(FormularioPedidoComponent) formularioPedidoComponent!: FormularioPedidoComponent;

  dialogVisible: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private tradutorService: TradutorService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.buscaClientes();
    this.buscaPedidos();
    this.tradutorService.setTranslation();
  }

  editaPedido(pedido: Pedido){
    this.isEditMode = true;
    this.pedidoSelecionado = pedido;
    this.dialogVisible = true;  
  }

  abrirConfirmacaoExclusao (pedido: Pedido) {
    this.pedidoSelecionado = pedido;
    this.confirmDialog.message = `Tem certeza que deseja excluir o pedido de ID ${this.pedidoSelecionado.id}?`;
    this.confirmDialog.open();
  }

  redirecionaItensPedido (pedido: Pedido) {
    const id = pedido.id; 
    this.router.navigate([`itensPedido/pedido/${id}`]);
  }

  deletaPedido() {
    this.pedidoService.excluirRegistro(this.pedidoSelecionado.id).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Excluído', detail: 'Pedido excluído com sucesso' });
        this.buscaPedidos(); 
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'erro', detail: 'Erro ao excluir pedido'})
      }
    })
  }

  abrirDialog() {
    this.isEditMode = false;
  if (this.formularioPedidoComponent) {
    this.formularioPedidoComponent.limpar();
  }
  this.dialogVisible = true;
  }

  limpar(table: Table) {
    table.clear();
    this.filtroPesquisa = ''
  }

  buscaPedidos() {
    this.pedidoService.obterTodos().subscribe((listaPedidos) => {
      this.pedidos = listaPedidos.map(pedido => ({
        ...pedido,
        cliente: this.clientes.find(c => c.id === pedido.cliente_id)
      }));
    })  
  }

  buscaClientes() {
    this.clienteService.obterTodos().subscribe((listaClientes) => {
      this.clientes = listaClientes;
    });
  }

  salvarPedido(pedidoData: Pedido) {
    console.log(pedidoData)
    if (this.isEditMode) {
      const pedidoEditado = { ...pedidoData, id: this.pedidoSelecionado.id}
      this.pedidoService.editarRegistro(pedidoEditado).subscribe({
        next: res => {
          this.messageService.add({ severity: 'success', summary: 'Atualização', detail: 'Pedido atualizado com sucesso'})
          this.buscaPedidos();
          this.dialogVisible = false;
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Erro ao atualizar pedido', detail: err.message})
        }
      })
    } else {
      this.pedidoService.salvarNovo(pedidoData).subscribe({
        next: res => {
          this.messageService.add({ severity: 'success', summary: 'Adicionar', detail: 'pedido adicionado com sucesso'})
          this.buscaPedidos();
          this.dialogVisible = false;
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Erro ao adicionar pedido', detail: err})  
          this.dialogVisible = false;
        }
      }) 
    }
  }

}
