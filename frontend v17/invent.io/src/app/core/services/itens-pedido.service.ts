import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemPedido } from '../types/types';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class ItensPedidoService extends Service<ItemPedido>{

  private static readonly apiUrl = 'http://localhost:3000/itensPedidos';

  constructor(http: HttpClient) {
    super(http, ItensPedidoService.apiUrl)
   }

  override buscarItensPorPedido(id: number) {
    return super.buscarItensPorPedido(id);
  }

}
