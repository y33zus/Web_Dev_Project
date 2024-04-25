import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Movie } from '../../../models';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  movieId!: number;
  userId!: number;
  isInThisWatchList: boolean = false;
  isInThisWatchedList: boolean = false;
  isInThisPersonalList: boolean = false;

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id']; // Получаем ID фильма из параметров маршрута
      this.movieService.getMovie(this.movieId).subscribe(movie => {
        this.movie = movie;
      });
    });
  }

  checkIfMovieInWatchList() {
    this.movieService.isInWatchList(this.movieId).subscribe(isInList => {
      this.isInThisWatchList = isInList;
    });
  }

  checkIfMovieInWatchedList() {
    this.movieService.isInWatchedList(this.movieId).subscribe(isInList => {
      this.isInThisWatchedList = isInList;
    });
  }

  checkIfMovieInPersonalList() {
    this.movieService.isInPersonalList(this.movieId).subscribe(isInList => {
      this.isInThisPersonalList = isInList;
    });
  }

  addMovieToWatchList() {
    this.movieService.addToWatchList(this.movieId, this.userId).subscribe({
      next: (response) => {
        this.isInThisWatchList = false;
        alert('Movie added to Watch List');
      },
      error: (error) => {
        this.isInThisWatchList = true;
        alert('This movie is already in your Watch List');
        console.error(error);
      }
    });
  }

  removeMovieFromWatchList() {
    this.movieService.removeFromWatchList(this.movieId, this.userId).subscribe({
      next: (response) => {
        this.isInThisWatchList = true;
        alert('Movie removed from Watch List');
      },
      error: (error) => {
        this.isInThisWatchList = false;
        alert('Movie is not in your Watch List');
        console.error(error);
      }
    });
  }

  addMovieToWatchedList() {
    this.movieService.addToWatchedList(this.movieId, this.userId).subscribe({
      next: (response) => {
        this.isInThisWatchedList = false;
        alert('Movie added to your Watched List');
      },
      error: (error) => {
        this.isInThisWatchedList = true;
        alert('Movie is already in your Watched list');
        console.error(error);
      }
    });
  }

  removeMovieFromWatchedList() {
    this.movieService.removeFromWatchedList(this.movieId, this.userId).subscribe({
      next: (response) => {
        this.isInThisWatchedList = false;
        alert('Movie removed from your Watched List');
      },
      error: (error) => {
        this.isInThisWatchedList = true;
        alert('Movie is not in your Watched List');
        console.error(error);
      }
    });
  }

  addMovieToPersonal() {
    this.movieService.addToPersonal(this.movieId, this.userId).subscribe({
      next: (response) => {
        alert('Movie added to Personal list');
      },
      error: (error) => {
        alert('Movie is already in Personal list');
        console.error(error);
      }
    });
  }

  removeMovieFromPersonal() {
    this.movieService.removeFromPersonal(this.movieId, this.userId).subscribe({
      next: (response) => {
        alert('Movie removed from Personal list');
      },
      error: (error) => {
        alert('Movie is not in Personal list');
        console.error(error);
      }
    });
  }
}
