import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';

export const API = new InjectionToken<string>('apiUrl')

@Injectable({
  providedIn: 'root'
})
export class Service<T> {

  protected http: HttpClient;
  atualizaConsulta = new Subject<any>(); 
  acao$ = this.atualizaConsulta.asObservable();

  constructor(
    http: HttpClient, @Inject(API) private apiUrl: string) {
      this.http = http;
    }

    obterTodos(): Observable<T[]> {
      return this.http.get<T[]>(this.apiUrl).pipe(
        catchError(this.handleError)
      );
    }
  
    buscarPorId(id: number): Observable<T> {
      const url =`${this.apiUrl}/${id}`
      return this.http.get<T>(url).pipe(
        catchError(this.handleError)
      );
    }
  
    salvarNovo(modelo: T): Observable<T> {
      return this.http.post<T>(this.apiUrl, modelo).pipe(
        catchError(this.handleError)
      );
    }
  
    excluirRegistro(id: number): Observable<T> {
      const url =`${this.apiUrl}/${id}`
      return this.http.delete<T>(url).pipe(
        catchError(this.handleError)
      );
    }
  
    editarRegistro(modelo: T): Observable<T> {
      const url =`${this.apiUrl}/${(modelo as any).id}`
      return this.http.put<T>(url, modelo).pipe(
        catchError(this.handleError)
      );
    }

    private handleError(error: any): Observable<never> {
      console.error('Um erro ocorre:', error);
      return throwError('Deu ruim!');
    }
  
}
