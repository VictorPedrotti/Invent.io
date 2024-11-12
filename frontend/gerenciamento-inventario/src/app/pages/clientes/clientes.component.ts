import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Cliente, Pedido } from '../../core/types/types';
import { FilterMatchMode, SelectItem } from 'primeng/api';
import { MenuSuperiorComponent } from "../../shared/menu-superior/menu-superior.component";
import { MenuLateralComponent } from "../../shared/menu-lateral/menu-lateral.component";

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    MenuSuperiorComponent,
    MenuLateralComponent
],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes: Cliente[] = []
  pedidos: Pedido[] = [];
  abreHistorico = {}
  matchModeOptions: SelectItem[];

  constructor () {
    this.matchModeOptions = [
      { label: 'Contém', value: FilterMatchMode.CONTAINS },
      { label: 'Começa com', value: FilterMatchMode.STARTS_WITH },
      { label: 'Igual a', value: FilterMatchMode.EQUALS },
      { label: 'Diferente de', value: FilterMatchMode.NOT_EQUALS }
    ]
  }

  listaHistoricos() {

  }

  fechaHistoricos() {
    
  }

  customSort(event: any) {

  }
}
