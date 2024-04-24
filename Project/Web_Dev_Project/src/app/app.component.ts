import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { LoggingInComponent } from './logging-in/logging-in.component';
import { PersonalTopComponent } from './personal-top/personal-top.component';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { WatchedListComponent } from './watched-list/watched-list.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HomeComponent, ContentComponent,
    LoggingInComponent, PersonalTopComponent, RecomendationComponent,
    WatchListComponent, WatchedListComponent, MoviesComponent, MovieDetailsComponent, RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Web_Dev_Project';
  niggers: number[];

  constructor() {
    this.niggers = [1, 2, 3];
  }
}
