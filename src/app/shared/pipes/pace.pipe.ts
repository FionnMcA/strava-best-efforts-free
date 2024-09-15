import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pace',
  standalone: true
})
export class PacePipe implements PipeTransform {
   transform(averageSpeed: number): string {
    if (!averageSpeed || averageSpeed <= 0) return 'Invalid speed';

    const secondsPerKilometer = 1000 / averageSpeed;

    const minutes = Math.floor(secondsPerKilometer / 60);
    const seconds = Math.floor(secondsPerKilometer % 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')} /km`;
  }
}
