import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  baseUrl: string = 'http://192.168.56.3:8090/api/';

  constructor(private http: HttpClient) {}

  getAllSalesBySeller(iduser: number) {
    const url = `${this.baseUrl}sales/user/${iduser}`;

    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // GET request with headers
    return this.http.get(url, { headers });
  }

  getClientCount() {
    const url = `${this.baseUrl}sales/clients/count`;

    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // GET request with headers
    return this.http.get(url, { headers });
  }
}
