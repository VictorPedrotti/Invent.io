import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from './service';
import { Produto } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends Service<Produto>{

  private static readonly apiUrl = 'http://localhost:3000/produtos';

  constructor(http: HttpClient) {
    super(http, ProdutoService.apiUrl)
   }
}
