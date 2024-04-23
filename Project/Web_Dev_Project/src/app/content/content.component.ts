import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../models';
import { MovieService } from '../movie.service';
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService){
  
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

}
