import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://127.0.0.1:8080/api/';
  constructor(private http: HttpClient) {}

  getSeller(email: string) {
    const url = `${this.baseUrl}user/email/${email}`;

    // Get token from localStorage
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // GET request with headers
    return this.http.get(url, { headers });
  }
}
