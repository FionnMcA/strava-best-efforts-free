import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sToHMS',
  standalone: true
})
export class SecondsToHourMinPipe implements PipeTransform {

   transform(value: number): string {
    if (value < 3600) {
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      return `${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    } else {
      const hours = Math.floor(value / 3600);
      const minutes = Math.floor((value % 3600) / 60);
      return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
    }
  }
}