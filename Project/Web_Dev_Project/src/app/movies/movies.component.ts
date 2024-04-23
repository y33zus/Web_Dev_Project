import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../models';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService){
  
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

}
