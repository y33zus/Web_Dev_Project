import { Component, OnInit } from '@angular/core';
import { Watch_list } from '../../../models';
import { WatchListService } from '../watch-list.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.css'
})
export class WatchListComponent{
  movieID!:number;
  userID!:number;

  constructor(private MovieService: MovieService){
  
  }

  addMovie() {
    this.MovieService.addToWatchList(this.movieID, this.userID).subscribe({
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
    this.MovieService.removeFromWatchList(this.movieID, this.userID).subscribe({
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
