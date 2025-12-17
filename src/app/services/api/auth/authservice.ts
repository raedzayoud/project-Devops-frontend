import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://192.168.56.3:8090/api/';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginUrl = this.baseUrl + 'auth/login';

    // corps de la requête
    const body = {
      email: email,
      password: password,
    };

    // POST vers l'API
    return this.http.post(loginUrl, body);
  }

  signup(name: string, email: string, password: string): Observable<any> {
    const signupUrl = `${this.baseUrl}auth/signup`;

    const body = { name, email, password };

    return this.http.post(signupUrl, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
