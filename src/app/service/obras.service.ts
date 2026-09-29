import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obra } from '../models/obras';

@Injectable({
  providedIn: 'root',
})
export class ObrasService {
  constructor(private http: HttpClient) {}

  getObras(): Observable<Obra[]> {
    return this.http.get<Obra[]>(`${API_CONFIG.baseUrl}/dashboard/obras`);
  }

  createObra(obra: Obra): Observable<Obra> {
    return this.http.post<Obra>(`${API_CONFIG.baseUrl}/create/obra`, obra);
  }

  getObra(id: string): Observable<Obra> {
    return this.http.get<Obra>(`${API_CONFIG.baseUrl}/obra/${id}`);
  }
}
