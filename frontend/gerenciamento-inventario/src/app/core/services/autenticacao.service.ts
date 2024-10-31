import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.developmente';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  autenticar(email: string, senha: string): Observable<HttpResponse<any>> {
    const credenciais = btoa(`${email}:${senha}`);
    const headers = { 'Authorization': `Basic ${credenciais}` };

    return this.http.get<any>(
      `${this.apiUrl}/login`,
      { headers, observe: 'response' }
    ).pipe(
      tap((response) => {
        const authToken = response.body?.token || '';

        this.tokenService.salvarToken(authToken);
      })
    )
  
  }
}
