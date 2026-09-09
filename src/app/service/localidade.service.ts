import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estados';
import { Cidade } from '../models/cidades';

@Injectable({
  providedIn: 'root',
})
export class LocalidadesService {
  private http = inject(HttpClient);

  private readonly API = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.API}/estados?orderBy=nome`);
  }

  getCidadesPorEstado(idEstado: number): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.API}/estados/${idEstado}/municipios?orderBy=nome`);
  }
}
