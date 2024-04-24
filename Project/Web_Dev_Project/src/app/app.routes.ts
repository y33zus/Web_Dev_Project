import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonalTopComponent } from './personal-top/personal-top.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { WatchedListComponent } from './watched-list/watched-list.component';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { ContentComponent } from './content/content.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { Component } from '@angular/core';
import { LoggingInComponent } from './logging-in/logging-in.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent },
    {path: 'personal-top', component: PersonalTopComponent },
    {path: 'watch-list', component: WatchListComponent },
    {path: 'watched-list', component: WatchedListComponent },
    {path: 'recomendation', component: RecomendationComponent },
    {path: 'content', component: ContentComponent },
    {path: 'movies', component: MoviesComponent},
    {path: 'movies/:id', component: MovieDetailsComponent},
    {path: 'logging-in', component: LoggingInComponent}
];
