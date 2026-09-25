import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obra } from '../models/obras';
import { Terreno } from '../models/terrenos';
import { Benfeitoria } from '../models/benfeitorias';

@Injectable({
  providedIn: 'root',
})
export class ObrasService {
  constructor(private http: HttpClient) {}

  getObras(): Observable<Obra[]> {
    return this.http.get<Obra[]>(`${API_CONFIG.baseUrl}/dashboard/obras`);
  }
}
