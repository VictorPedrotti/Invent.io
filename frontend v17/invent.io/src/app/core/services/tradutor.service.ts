import { Injectable } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
 
@Injectable({
  providedIn: 'root'
})
export class TradutorService {
 
  constructor(private primeNGConfig: PrimeNGConfig) { }
 
  setTranslation() {
    this.primeNGConfig.setTranslation({
      matchAll: 'Corresponde a todos',
      matchAny: 'Corresponde a qualquer',
      apply: 'Aplicar',
      clear: 'Limpar',
      addRule: 'Adicionar regra',
      startsWith: 'Começa com',
      contains: 'Contém',
      equals: 'É igual a',
      notEquals: 'Não é igual a',
      endsWith: 'Termina com',
      notContains: 'Não contém'
    });
  }
}