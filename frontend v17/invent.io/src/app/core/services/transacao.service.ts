import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from './service';
import { Transacao } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService extends Service<Transacao>{

  private static readonly apiUrl = 'http://localhost:3000/transacoes';

  constructor(http: HttpClient) {
    super(http, TransacaoService.apiUrl)
   }
}
