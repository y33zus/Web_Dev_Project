import { Component, OnInit } from '@angular/core';
import { Watched_list } from '../../../models';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-watched-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './watched-list.component.html',
  styleUrl: './watched-list.component.css'
})
export class WatchedListComponent implements OnInit{
  movies: Watched_list[] = [];

  constructor(private MovieService: MovieService){
  
  }

  ngOnInit() {
    this.MovieService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }


}
