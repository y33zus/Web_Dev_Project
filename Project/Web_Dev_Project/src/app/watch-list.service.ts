import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {
  private apiUrl = 'http://localhost:8000/api';  // Адаптируйте URL под ваш бэкенд

  constructor(private http: HttpClient) { }

  addToWatchList(movieId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/watch-list/add`, { movieId, userId });
  }

  removeFromWatchList(movieId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/watch-list/remove/${userId}/${movieId}`);
  }
}
