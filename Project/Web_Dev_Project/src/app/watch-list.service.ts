// src/app/watch-list/watch-list.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Watch_list } from '../../models'; 

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  private apiUrl = 'http://localhost:8000/'; 

  constructor(private http: HttpClient) {}

  addToWatchList(movieId: number, userId: number): Observable<Watch_list> {
    const data = { movie: movieId, user: userId };
    return this.http.post<Watch_list>(`${this.apiUrl}user/${userId}/watchlist/`, data);  
  }

  removeFromWatchList(watchlistId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}watchlist/${watchlistId}/`);
  }

  getWatchList(userId: number): Observable<Watch_list[]> {
    return this.http.get<Watch_list[]>(`${this.apiUrl}user/${userId}/watchlist/`);
  }
}
