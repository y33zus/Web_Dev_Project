import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalTopService {
  private apiUrl = 'https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
