import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  baseUrl: string = 'http://192.168.56.3:8090/api/';

  constructor(private http: HttpClient) {}

  getAllCategorie() {
    const url = this.baseUrl + 'categories';
    // Get token from localStorage
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // GET request with headers
    return this.http.get(url, { headers });
  }

  addCategorie(nom: string) {
    const url = this.baseUrl + 'categories';
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Wrap nom in an object
    const body = { nom: nom };

    return this.http.post(url, body, { headers });
  }
}
