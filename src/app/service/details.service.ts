import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { DetailsUser } from '../models/detailsUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  constructor(private http: HttpClient) {}

  detailsUser(): Observable<DetailsUser> {
    return this.http.get<DetailsUser>(`${API_CONFIG.baseUrl}/me`);
  }
}
