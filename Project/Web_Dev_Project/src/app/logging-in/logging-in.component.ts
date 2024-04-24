import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-logging-in',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './logging-in.component.html',
  styleUrl: './logging-in.component.css'
})
export class LoggingInComponent implements OnInit{
  phone_number: string = '';
  password: string = '';
  logged: boolean = false;

  ngOnInit() : void { 
    const access: string|null = localStorage.getItem("access"); 
    if(access){ 
      this.logged = true; 
    } 
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  login() : void { 
    this.authService.login(this.phone_number, this.password).subscribe((data) => { 
      this.logged = true; 
      localStorage.setItem("access", data.access); 
      localStorage.setItem("refresh", data.refresh); 
  })
}
}
