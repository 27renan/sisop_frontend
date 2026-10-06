import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  constructor(private http: HttpClient) {}

  detailsUser(): Observable<Usuario> {
    return this.http.get<Usuario>(`${API_CONFIG.baseUrl}/me`);
  }
}
