import { Component, OnInit } from '@angular/core';
import { PersonalTopService } from '../personal-top.service';
import { Personal_top } from '../../../models';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Movie } from '../../../models';
import { MovieService } from '../movie.service';
@Component({
  selector: 'app-personal-top',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './personal-top.component.html',
  styleUrl: './personal-top.component.css'
})
export class PersonalTopComponent{
  movies!: Movie[];

  constructor(private MovieService: MovieService){
  
  }

  loadMovies() {
    const userId = 'user-id'; // Здесь должен быть ID текущего пользователя
    this.MovieService.getMoviesPersonal(userId).subscribe(movies => {
      this.movies = movies;
    });
  }


}
