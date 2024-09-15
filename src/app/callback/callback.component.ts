import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
    private route = inject(ActivatedRoute)
    private router = inject(Router)
    private authService = inject(AuthService)

    ngOnInit(): void {
      const code = this.route.snapshot.queryParamMap.get('code')
      if(code){
        this.authService.exchangeCodeForToken(code).subscribe({
          next: () => this.router.navigate(['/results'])
        })
      } else {
        this.router.navigate([''])
      }
    }
}
