import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class produitService {
  baseUrl: string = 'http://127.0.0.1:8080/api/';

  constructor(private http: HttpClient) {}

  getAllProduits() {
    const url = this.baseUrl + 'products';
    // Get token from localStorage
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // GET request with headers
    return this.http.get(url, { headers });
  }

  addProduit(newProduit: any) {
    const url = this.baseUrl + 'products';
    const token = sessionStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(url, newProduit, { headers });
  }
}
