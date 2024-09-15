import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'mToKm',
    standalone: true
})
export class MToKmPipe implements PipeTransform {
    transform(value: number): string {
        if(!value) return '0 km';
        return (value / 1000).toFixed(2) + ' km';
    }
}