// NEW VERSION
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common'; 

@Component({
  selector: 'app-logging-in',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule], 
  templateUrl: './logging-in.component.html',
  styleUrls: ['./logging-in.component.css']
})
export class LoggingInComponent implements OnInit {
  phone_number: string = '';
  password: string = '';
  logged: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.logged = this.authService.isAuthenticated();
    } else {
      this.logged = false;
    }
  }

  login(): void {
    this.authService.login(this.phone_number, this.password).subscribe({
      next: (data: any) => {
        if (isPlatformBrowser(this.platformId)) {
          this.authService.saveToken(data.access);
        }
        this.logged = true;
        this.router.navigate(['']); 
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.logout();
      this.logged = false;
      this.router.navigate(['/login']); 
    }
  }
}

