import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from '../config/api.config';
import { Credenciais } from '../models/credenciais';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  authenticate(creds: Credenciais) {
    return this.http.post<LoginResponse>(`${API_CONFIG.baseUrl}/session`, creds);
  }

  successfulLogin(token: string) {
    localStorage.setItem('token', token);
  }

  isAuthenticated() {
    /*
      Servidor: não tenta acessar localStorage, considera usuário não autenticado 
    */
    if (typeof window === 'undefined') {
      return false;
    }

    let token = localStorage.getItem('token');

    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }

    return false;
  }

  logout() {
    localStorage.clear();
  }
}
