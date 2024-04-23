import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:8000/movies/';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
