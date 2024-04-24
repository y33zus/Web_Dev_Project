import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../models';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movies: Movie[] = [];
  movie!: Movie;

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

}
