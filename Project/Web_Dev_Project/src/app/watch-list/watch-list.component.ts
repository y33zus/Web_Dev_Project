import { Component, OnInit } from '@angular/core';
import { Watch_list } from '../../../models';
import { WatchListService } from '../watch-list.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MovieService } from '../movie.service';
import { AuthService } from '../auth.service'; 
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.css'
})

export class WatchListComponent implements OnInit {
  watchList: Watch_list[] = [];
  user_id: number | null = null;
  movie_id!: number;

  constructor(
    private watchListService: WatchListService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user_id = this.authService.getCurrentUserId();
    if (this.user_id) {
      this.loadWatchList(this.user_id);
    }
  }

  loadWatchList(user_id: number): void {
    this.watchListService.getWatchList(user_id).subscribe({
      next: (data) => this.watchList = data,
      error: (error) => console.error('Error getting list view', error)
    });
  }

  addMovie(movie_id: number): void {
    const user_id = this.user_id;
    if (user_id !== null) {
      this.watchListService.addToWatchList(movie_id, user_id).subscribe({
        next: (response) => {
          alert('The film has been added to the watch list!');
          this.loadWatchList(user_id);
        },
        error: (error) => {
          alert('Error when adding a movie to the watch list');
          console.error(error);
        }
      });
    } else {
      alert('The user is not identified');
    }
  }

  removeMovie(movie_id: number): void {
    const user_id = this.user_id;
    if (user_id !== null) { 
      this.watchListService.removeFromWatchList(movie_id).subscribe({
        next: (response) => {
          alert('The film has been removed from the watch list!');
          this.loadWatchList(user_id); 
        },
        error: (error) => {
          alert('Error when deleting a movie from the watch list');
          console.error(error);
        }
      });
    } else {
      alert('The user is not identified');
    }
  }
}