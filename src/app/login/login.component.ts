import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/authService.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  private authService = inject(AuthService)

  ngOnInit(): void {
    this.authService.goToStravaAuthPage()
  }

}
