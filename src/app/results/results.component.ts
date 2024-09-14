import { Component, inject, OnInit } from '@angular/core';
import { StravaService } from '../shared/services/strava.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  loading: boolean = false;

  private stravaService = inject(StravaService)

  ngOnInit(): void {
    this.loading = true;
    this.stravaService.fetchActivites().subscribe({
      next: (activities) => {
        console.log('Activities: ', JSON.stringify(activities))
        this.loading = false
      },
      error: (error) => {
        console.log('Error fetching activitieS: ', error);
        this.loading = false;
      }
    }
    //   (activities) => {
    //   console.log('Activites: ', JSON.stringify(activities))
    //   this.loading = false;
    // }
  )
  }
}
