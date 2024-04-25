import { Component, OnInit } from '@angular/core';
import { Watched_list } from '../../../models';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Movie } from '../../../models';

@Component({
  selector: 'app-watched-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './watched-list.component.html',
  styleUrl: './watched-list.component.css'
})
export class WatchedListComponent{
  movies!:Movie[];

  constructor(private MovieService: MovieService){
  
  }

  loadMovies() {
    const userId = 'user-id'; // Здесь должен быть ID текущего пользователя
    this.MovieService.getMoviesForUsersWatchedList(userId).subscribe(movies => {
      this.movies = movies;
    });
  }


}
