import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AppCookieService {
  constructor(private cookieService: CookieService) {}

  salvarUsuario(usuario: any): void {
    this.cookieService.set('usuario', JSON.stringify(usuario), 1, '/');
  }

  obterUsuario(): any | null {
    const usuario = this.cookieService.get('usuario');

    if (!usuario) {
      return null;
    }

    return JSON.parse(usuario);
  }

  removerUsuario(): void {
    this.cookieService.delete('usuario', '/');
  }
}
