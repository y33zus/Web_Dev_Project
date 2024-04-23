import { Component, OnInit } from '@angular/core';
import { Recommendation } from '../../../models';
import { RecommendationService } from '../recommendation.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './recomendation.component.html',
  styleUrl: './recomendation.component.css'
})
export class RecomendationComponent implements OnInit {
  movies: Recommendation[] = [];

  constructor(private recommendationService: RecommendationService){
  
  }

  ngOnInit() {
    this.recommendationService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }


}
