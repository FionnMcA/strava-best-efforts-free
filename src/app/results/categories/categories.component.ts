import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RunDataService } from '../../shared/services/run-data.service';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  private runDataService = inject(RunDataService)

  distanceCategories: string[] = ['All Runs', '5km', '10km', '15km', 'Half-Marathon', '30km', 'Marathon', '50km'];
  selectedDistance: string = 'All Runs';
  
  viewMode: 'year' | 'all-time' = 'all-time';

  onSelectDistance(distance: string){
    this.selectedDistance = distance;
    this.runDataService.setSelectedDistanceCategory(distance);
  }

  onSelectViewMode(viewMode: 'year' | 'all-time'){
    this.viewMode = viewMode;
    this.runDataService.setViewMode(viewMode)
  }
}
