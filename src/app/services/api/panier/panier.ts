import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PanierModel } from '../../models/panier';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  baseUrl: string = 'http://127.0.0.1:8080/api/';
  constructor(private http: HttpClient) {}

  savePanier(panier: PanierModel) {
    const url = `${this.baseUrl}panier`;

    // Get token from localStorage
    const token = sessionStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // ✅ Correct order: (url, body, {headers})
    return this.http.post(url, panier, { headers });
  }
}
