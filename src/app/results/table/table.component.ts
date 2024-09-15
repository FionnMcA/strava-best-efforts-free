import { ChangeDetectorRef, Component, effect, HostListener, inject, signal } from '@angular/core';
import { RunDataService } from '../../shared/services/run-data.service';
import { Activity } from '../../shared/models/activity.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TableUtils } from '../../shared/utils/table.utils';
import { ExtendedRowComponent } from './extended-row/extended-row.component';
import { PacePipe } from '../../shared/pipes/pace.pipe';
import { SecondsToHourMinPipe } from '../../shared/pipes/seconds-to-hour-min.pipe';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, ExtendedRowComponent, PacePipe, SecondsToHourMinPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  private runDataService = inject(RunDataService);
  filteredRuns: Activity[] | Map<string, Activity[]> = [];
  years: string[] = this.runDataService.years;
  expandedRows: { [key:string]: boolean} = {}

  sortField = signal<string>('start_date_local');
  sortOrder = signal<number>(-1);

  sortStatesByYear: { [key: string]: { sortField: string; sortOrder: number } } = {};

  constructor(private cdr: ChangeDetectorRef){
    effect(() => {
      this.filteredRuns = this.runDataService.filteredRuns;
      this.years = this.runDataService.years
      this.expandedRows = {};
      this.sortField.set('start_date_local');
      this.sortOrder.set(-1)
      this.updateDateLength()

      this.years.forEach((year: string) => {
        this.sortStatesByYear[year] = {
          sortField: 'start_date_local',
          sortOrder: -1,
        }
      })
      this.cdr.detectChanges();
    }, { allowSignalWrites: true })
  }

  dateLengthAllTime: string = 'MMMM d y';
  dateLengthByYear: string = 'MMMM d';
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.updateDateLength()
  }

  // Change date format on screensize
  updateDateLength(){
    const screenWidth = window.innerWidth;
    if(screenWidth < 768){
      this.dateLengthAllTime = 'd MMM yy';
      this.dateLengthByYear = 'd MMM';
    } else if (screenWidth >= 768){
      this.dateLengthAllTime = 'd MMMM y';
      this.dateLengthByYear = 'd MMMM';
    }
  }

  onRowSelect(event: any){
    this.expandedRows = {};
    this.expandedRows[event.data.id] = true;
  }

  onRowUnselect(event: any){
    this.expandedRows[event.data.id] = false;
  }

  onEdgeClicked(){
    this.expandedRows = {};
  }

  isArray(): boolean {
    return Array.isArray(this.filteredRuns);
  }

  isMap(): boolean {
    return this.filteredRuns instanceof Map;
  }

  getRunsAsArray(): Activity[] {
    return this.isArray() ? this.filteredRuns as Activity[] : [];
  }

  getRunsForYear(year: string): Activity[] {
    if(this.filteredRuns instanceof Map){
      return this.filteredRuns.get(year) || [];
    }
    return [];
  }

  onSort(event: any){
    this.expandedRows = {};
    this.sortField.set(event.field);
    this.sortOrder.set(event.order);
    TableUtils.sortRows(event, this.getRunsAsArray());
  }

  getSortField(year: string): string {
    return this.sortStatesByYear[year].sortField;
  }

  getSortOrder(year: string): number {
    return this.sortStatesByYear[year].sortOrder;
  }

  onSortYears(event: any, year: string) {
  const field = event.field as keyof Activity;
  const order = event.order;

  this.sortStatesByYear[year] = {
    sortField: field, 
    sortOrder: order 
  };
  this.expandedRows = {};

  const runsArray = this.getRunsForYear(year);
  if (Array.isArray(runsArray)) {
    TableUtils.sortRowsByYear(event, runsArray)
  }
}

  runMedals(runs: Activity[], runId: number){
    const sortedRuns = [...runs].sort((a,b) => b.average_speed - a.average_speed)
    const runRank = sortedRuns.findIndex(run => run.id === runId)
    switch(runRank){
      case 0:
        return 'Gold'
      case 1:
        return 'Silver'
      case 2:
        return 'Bronze'
      default: 
        return null
    }
  }
}
