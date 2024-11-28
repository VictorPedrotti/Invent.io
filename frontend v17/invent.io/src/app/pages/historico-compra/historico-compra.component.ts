import { Component, OnInit } from '@angular/core';
import { MenuSuperiorComponent } from "../../shared/menu-superior/menu-superior.component";
import { MenuLateralComponent } from "../../shared/menu-lateral/menu-lateral.component";
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Cliente, Pedido } from '../../core/types/types';
import { ClienteService } from '../../core/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { TradutorService } from '../../core/services/tradutor.service';

@Component({
  selector: 'app-historico-compra',
  standalone: true,
  imports: [
    MenuSuperiorComponent, 
    MenuLateralComponent,
    TableModule,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './historico-compra.component.html',
  styleUrl: './historico-compra.component.scss'
})
export class HistoricoCompraComponent implements OnInit {

  pedidos: Pedido[] = [];
  filtroPesquisa: string = '';
  clienteId!: number;
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private tradutorService: TradutorService
  ) {}

  ngOnInit(): void {
    this.buscaClientes();
    this.tradutorService.setTranslation();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.clienteId = +id;
        this.BuscaPedidoPorCliente();
      }
    })
  }

  limpar(table: Table) {
    table.clear();
    this.filtroPesquisa = ''
  }

  BuscaPedidoPorCliente() {
    this.clienteService.buscaPedidosPorClienteId(this.clienteId).subscribe((listaPedidos) => {
      this.pedidos = listaPedidos.map(pedido => ({
        ...pedido,
        cliente: this.clientes.find(c => c.id === pedido.cliente_id)
      }));;
    })
  }

  buscaClientes() {
    this.clienteService.obterTodos().subscribe((listaClientes) => {
      this.clientes = listaClientes;
    })
  }
}
