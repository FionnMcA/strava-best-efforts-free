import { Component, effect, inject, OnInit } from '@angular/core';
import { StravaService } from '../shared/services/strava.service';
import { CommonModule } from '@angular/common';
import { VersionUtils } from '../shared/utils/version.utils';
import { CategoriesComponent } from './categories/categories.component';
import { RunDataService } from '../shared/services/run-data.service';
import { Activity } from '../shared/models/activity.model';
import { TableComponent } from './table/table.component';
import { NoPrComponent } from './no-pr/no-pr.component';
import { MapComponent } from './table/extended-row/map/map.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, CategoriesComponent, TableComponent, NoPrComponent, MapComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  loading: boolean = false;
  private stravaService = inject(StravaService)
  private runDataService = inject(RunDataService)
  selectedDistance: string = this.runDataService.selectedDistanceCategory;
  viewMode: string = this.runDataService.viewMode;
  categorizedByDistanceRuns: Map<string, Map<string, Activity[]>> = new Map();
  hasRuns: boolean = false;

  constructor(){
    effect(() => {
      this.selectedDistance = this.runDataService.selectedDistanceCategory;
      this.viewMode = this.runDataService.viewMode;
      setTimeout(() => {
        this.filterRuns()
      })
    })
  }

  ngOnInit(): void {
    this.loading = true;
    this.stravaService.fetchActivites().subscribe({
      next: (runs) => {
        this.categorizedByDistanceRuns = VersionUtils.categorizeRuns(runs)
        this.filterRuns()
        this.loading = false
      },
      error: (error) => {
        console.log('Error fetching activities: ', error);
        this.loading = false;
      }
    })
  }

  filterRuns() {
    const selectedDistanceMap = this.categorizedByDistanceRuns.get(this.selectedDistance);
    if (selectedDistanceMap) {
      if (this.viewMode === 'all-time') {
        const flattenedRuns = Array.from(selectedDistanceMap.values()).flat();
        this.runDataService.setFilteredRuns(flattenedRuns);
        this.hasRuns = flattenedRuns.length > 0;
      } else if (this.viewMode === 'year') {
        this.runDataService.setFilteredRuns(selectedDistanceMap);
        this.hasRuns = selectedDistanceMap.size > 0;
      }
    } else {
      console.log(`No runs found for distance: ${this.selectedDistance}`);
      this.runDataService.setFilteredRuns([]);
      this.hasRuns = false;
    }
  }
}
