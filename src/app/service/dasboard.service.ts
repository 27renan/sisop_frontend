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
export class DashboardService {
  constructor(private http: HttpClient) {}

  dashboardObras(): Observable<Obra[]> {
    return this.http.get<Obra[]>(`${API_CONFIG.baseUrl}/dashboard/obras`);
  }

  dashboardTerrenos(): Observable<Terreno[]> {
    return this.http.get<Terreno[]>(`${API_CONFIG.baseUrl}/dashboard/terrenos`);
  }

  dashboardBenfeitorias(): Observable<Benfeitoria[]> {
    return this.http.get<Benfeitoria[]>(`${API_CONFIG.baseUrl}/dashboard/benfeitorias`);
  }
}
