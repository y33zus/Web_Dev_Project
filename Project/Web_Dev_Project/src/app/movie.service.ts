import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:8000/movies/';
  private watchUrl = 'http://127.0.0.1:8000/watchlist/'

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getMovie(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  addToWatchList(movieId: number, userId: number): Observable<any> {
    return this.http.post(`${this.watchUrl}/watch-list/add`, { movieId, userId });
  }

  removeFromWatchList(movieId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.watchUrl}/watch-list/remove/${userId}/${movieId}`);
  }
}
