import { Component, NgModule, OnInit } from '@angular/core';
import { Movie } from '../../../models';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movies: Movie[] = [];
  movie!: Movie;
  movieId!: number;
  userId!: number;

  constructor(private movieService: MovieService, 
    private route: ActivatedRoute){
  
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.movieService.getMovie(id).subscribe(movie => {
        this.movie = movie;
      });
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