import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { FornecedorComponent } from './pages/fornecedor/fornecedor.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { ItensPedidoComponent } from './pages/itens-pedido/itens-pedido.component';
import { TransacaoComponent } from './pages/transacao/transacao.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'produtos', component: ProdutosComponent},
  { path: 'fornecedores', component: FornecedorComponent},
  { path: 'pedidos', component: PedidoComponent},
  { path: 'itensPedido/pedido/:id', component: ItensPedidoComponent },
  { path: 'transacoes', component: TransacaoComponent},
  { path: 'dashboard', component: DashboardComponent}
];
