import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../models';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  movieId!: number;
  userId!: number;

  constructor(private movieService: MovieService){
  
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

  addMovie() {
    this.movieService.addToWatchList(this.movieId, this.userId).subscribe({
      next: (response) => {
        alert('Фильм добавлен в список просмотра!');
      },
      error: (error) => {
        alert('Ошибка при добавлении фильма в список просмотра');
        console.error(error);
      }
    });
  }

  removeMovie() {
    this.movieService.removeFromWatchList(this.movieId, this.userId).subscribe({
      next: (response) => {
        alert('Фильм удалён из списка просмотра!');
      },
      error: (error) => {
        alert('Ошибка при удалении фильма из списка просмотра');
        console.error(error);
      }
    });

}
}
