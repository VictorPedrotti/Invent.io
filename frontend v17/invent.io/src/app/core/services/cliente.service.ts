import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from './service';
import { Cliente, Pedido } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends Service<Cliente>{

  private static readonly apiUrl = 'http://localhost:3000/clientes';

  constructor(http: HttpClient) {
    super(http, ClienteService.apiUrl)
   }

   buscaPedidosPorClienteId(id: number): Observable<Pedido[]> {
    const url = `${ClienteService.apiUrl}/${id}/pedidos`
    return this.http.get<Pedido[]>(url).pipe();
   }
}
