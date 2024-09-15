import { Injectable, signal } from '@angular/core';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class RunDataService {
  private selectedDistanceCategorySignal = signal<string>('All Runs');
  private viewModeSignal = signal<'year' | 'all-time'>('all-time');
  private filteredRunsSignal = signal<Activity[] | Map<string, Activity[]>>([]);

  // Getters
  get selectedDistanceCategory() {
    return this.selectedDistanceCategorySignal();
  }

  get viewMode() {
    return this.viewModeSignal();
  }

  get filteredRuns() {
    return this.filteredRunsSignal();
  }

  get years(){
    const runs = this.filteredRunsSignal();
    if(runs instanceof Map){
        return Array.from(runs.keys());
    }
    return [];
  }

  // Setters
  
  setSelectedDistanceCategory(category: string) {
    this.selectedDistanceCategorySignal.set(category);
  }

  setViewMode(mode: 'year' | 'all-time') {
    this.viewModeSignal.set(mode);
  }

  setFilteredRuns(runs: Activity[] | Map<string, Activity[]>) {
    this.filteredRunsSignal.set(runs);
  }
}
