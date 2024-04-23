import { Component, OnInit } from '@angular/core';
import { Watch_list } from '../../../models';
import { WatchListService } from '../watch-list.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.css'
})
export class WatchListComponent implements OnInit {
  movies: Watch_list[] = [];

  constructor(private watchListService: WatchListService){
  
  }

  ngOnInit() {
    this.watchListService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

}
