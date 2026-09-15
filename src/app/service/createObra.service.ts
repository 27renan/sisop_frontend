import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obra } from '../models/obras';

@Injectable({
  providedIn: 'root',
})
export class CreateObraService {
  constructor(private http: HttpClient) {}

  createObra(obra: Obra): Observable<Obra> {
    return this.http.post<Obra>(`${API_CONFIG.baseUrl}/create/obra`, obra);
  }
}
