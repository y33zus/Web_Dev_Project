import { Component, OnInit } from '@angular/core';
import { PersonalTopService } from '../personal-top.service';
import { Personal_top } from '../../../models';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-personal-top',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './personal-top.component.html',
  styleUrl: './personal-top.component.css'
})
export class PersonalTopComponent implements OnInit {
  movies: Personal_top[] = [];

  constructor(private personalTopService: PersonalTopService){
  
  }

  ngOnInit() {
    this.personalTopService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

}
