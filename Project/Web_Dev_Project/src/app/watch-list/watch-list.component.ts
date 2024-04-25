import { Component, OnInit } from '@angular/core';
import { Watch_list } from '../../../models';
import { WatchListService } from '../watch-list.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../../../models';

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.css'
})
export class WatchListComponent{
  movieID!:number;
  userID!:number;
  movies!: Movie[];

  constructor(private MovieService: MovieService){
  
  }

  loadMovies() {
    const userId = 'user-id'; // Здесь должен быть ID текущего пользователя
    this.MovieService.getMoviesForUsersWatchList(userId).subscribe(movies => {
      this.movies = movies;
    });
  }

}
