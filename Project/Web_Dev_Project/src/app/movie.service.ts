import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../models';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:8000/movies/';
  private watchUrl = 'http://127.0.0.1:8000/watchlist/';
  private watchedUrl = 'http://127.0.0.1:8000/watchedlist-list/';
  private personalUrl = 'http://127.0.0.1:8000/personaltop-list/';

  constructor(private http: HttpClient) { }

  isInThisList(movieId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/movies/${movieId}/is-in-watchlist`);
  }

  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getMovie(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }
 
  addToWatchList(movieId: number, userId: number): Observable<any> {
    return this.http.post(`${this.watchUrl}add`, { movieId, userId });
  }

  removeFromWatchList(movieId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.watchUrl}remove/${userId}/${movieId}`);
  }

  addToWatchedList(movieId: number, userId: number): Observable<any> {
    return this.http.post(`${this.watchedUrl}/watchedlist-list/add`, { movieId, userId });
  }

  removeFromWatchedList(movieId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.watchedUrl}/watchedlist-list/remove/${userId}/${movieId}`);
  }
  
  getMoviesForUsersWatchList(userId: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.watchUrl}/user/${userId}`);
  }

  getMoviesForUsersWatchedList(userId: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.watchedUrl}/user/${userId}`);
  }

  addToPersonal(movieId: number, userId: number): Observable<any> {
    return this.http.post(`${this.personalUrl}/personaltop-list/add`, { movieId, userId });
  }

  removeFromPersonal(movieId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.personalUrl}/personaltop-list/remove/${userId}/${movieId}`);
  }
  
  getMoviesPersonal(userId: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.personalUrl}/user/${userId}`);
  }
}
