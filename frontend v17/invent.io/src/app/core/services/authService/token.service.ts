import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'auth_token';

  salvarToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  retornarToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY); 
  }

  excluirToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  possuiToken(): boolean {
    return !!this.retornarToken();
  }
}
