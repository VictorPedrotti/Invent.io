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
    FormularioPedidoComponent
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
    private tradutorService: TradutorService
  ) {

  }

  ngOnInit(): void {
    this.buscaClientes();
    this.buscaPedidos();
    this.tradutorService.setTranslation();
  }

  editaPedido(pedido: Pedido){
    
  }

  abrirConfirmacaoExclusao (pedido: Pedido) {
    this.pedidoSelecionado = pedido;
    this.confirmDialog.message = `Tem certeza que deseja excluir o pedido de ID ${this.pedidoSelecionado.id}?`;
    this.confirmDialog.open();
  }

  redirecionaItensPedido (pedido: Pedido) {

  }

  deletaPedido() {

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

  }

}
