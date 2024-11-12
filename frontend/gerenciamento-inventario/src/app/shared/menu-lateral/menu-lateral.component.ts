import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ItemMenu } from '../../core/types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    SidebarModule,
    MenuModule,
    CommonModule,
    
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {
  itensMenu: ItemMenu[] = [];
  barraLateralVisivel: boolean = true;

  constructor() {
    this.itensMenu = [
      {
        texto: 'Dashboard',
        icone: 'pi pi-chart-bar',
        rota: ['/dashboard']
      },
      {
        texto: 'Clientes',
        icone: 'pi pi-users',
        rota: ['/clientes']
      },
      {
        texto: 'Produtos',
        icone: 'pi pi-box',
        rota: ['/produtos']
      },
      {
        texto: 'Fornecedores',
        icone: 'pi pi-briefcase',
        rota: ['/fornecedores']
      },
      {
        texto: 'Pedidos',
        icone: 'pi pi-shopping-cart',
        rota: ['/pedidos']
      },
      {
        texto: 'Transações',
        icone: 'pi pi-dollar',
        rota: ['/transacoes']
      }
    ];
  }
}
