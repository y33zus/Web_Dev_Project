import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logging-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './logging-in.component.html',
  styleUrl: './logging-in.component.css'
})
export class LoggingInComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(): void {
    this.http.post<{token: string}>('http://your-backend-url/api/login', {
      username: this.username,
      password: this.password
    }).subscribe(response => {
      this.authService.saveToken(response.token);
    }, error => {
      console.error('Login failed:', error);
    });
  }
}
