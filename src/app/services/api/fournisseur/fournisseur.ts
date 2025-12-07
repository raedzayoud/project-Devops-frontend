import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  baseUrl: string = 'http://127.0.0.1:8080/api/';

  constructor(private http: HttpClient) {}

  getAllFournisseur() {
    const url = this.baseUrl + 'suppliers';
    // Get token from localStorage
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // GET request with headers
    return this.http.get(url, { headers });
  }

  addFournisseur(nom: string, phone: string) {
    const url = this.baseUrl + 'suppliers';
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Wrap nom in an object
    const body = { nom: nom, phone: phone };

    return this.http.post(url, body, { headers });
  }
}
