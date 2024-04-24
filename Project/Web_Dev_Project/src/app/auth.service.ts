import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../../models';


/** NEW VERSION */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token'; //

  constructor(private http: HttpClient) {}

  login(phoneNumber: string, password: string): Observable<Token> {
    return this.http.post<Token>('http://127.0.0.1:8000/api/login/', { phone_number: phoneNumber, password });
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Возвращает true, если токен существует
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}



/** 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token'; 

  constructor(private http: HttpClient) {}

  login(phone_number:string,password:string): Observable<Token> { 
    return this.http.post<Token>(`{http://127.0.0.1:8000/api/login/}`, {phone_number,password})
  }
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem("access");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
*/