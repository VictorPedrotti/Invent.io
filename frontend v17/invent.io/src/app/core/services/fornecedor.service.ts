import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from './service';
import { Fornecedor } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends Service<Fornecedor>{

  private static readonly apiUrl = 'http://localhost:3000/fornecedores';

  constructor(http: HttpClient) {
    super(http, FornecedorService.apiUrl)
   }
}
