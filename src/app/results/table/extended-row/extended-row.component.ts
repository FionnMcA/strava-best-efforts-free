import { Component, HostListener, input } from '@angular/core';
import { Activity } from '../../../shared/models/activity.model';
import { MapComponent } from './map/map.component';
import { CommonModule } from '@angular/common';
import { MToKmPipe } from '../../../shared/pipes/m-to-km.pipe';
import { DigitalTimePipe } from '../../../shared/pipes/digitalTime.pipe';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-extended-row',
  standalone: true,
  imports: [MapComponent, CommonModule, MToKmPipe, DigitalTimePipe, TruncatePipe],
  templateUrl: './extended-row.component.html',
  styleUrl: './extended-row.component.css'
})
export class ExtendedRowComponent {
  run = input.required<Activity>();

  truncateLength: number = 55;

  constructor(){
    this.updateTruncateLength()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.updateTruncateLength()
  }

  // Change truncate threshold depending on the screen size
  updateTruncateLength(){
    const screenWidth = window.innerWidth;
    if(screenWidth < 767){
      this.truncateLength = 32;
    } else if(screenWidth < 1200){
      this.truncateLength = 38;
    } else if (screenWidth > 1200){
      this.truncateLength = 55;
    }
  }
  onLinkClicked(event: MouseEvent){
    event.stopPropagation()
  }
}
