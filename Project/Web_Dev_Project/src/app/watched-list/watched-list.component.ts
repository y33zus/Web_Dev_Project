import { Component, OnInit } from '@angular/core';
import { Watched_list } from '../../../models';
import { WatchListService } from '../watch-list.service';
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

  constructor(private watchListService: WatchListService){
  
  }

  ngOnInit() {
    this.watchListService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }


}
