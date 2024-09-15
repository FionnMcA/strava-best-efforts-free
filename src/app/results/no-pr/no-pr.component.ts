import { Component, effect, inject} from '@angular/core';
import { RunDataService } from '../../shared/services/run-data.service';

@Component({
  selector: 'app-no-pr',
  standalone: true,
  imports: [],
  templateUrl: './no-pr.component.html',
  styleUrl: './no-pr.component.css'
})
export class NoPrComponent {

  private runDataService = inject(RunDataService)
  distance = this.runDataService.selectedDistanceCategory

  constructor(){
    effect(() => {
      this.distance = this.runDataService.selectedDistanceCategory
    })
  }
}
