import { Component, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Input() summaryPolyline: string = '';
  map!: google.maps.Map;
  noMapData: boolean = false;

  constructor(private cd: ChangeDetectorRef) {} 

  ngAfterViewInit(): void {
    if(this.summaryPolyline){
      this.initMap();
      this.renderRoute();
    } else {
      this.noMapData = true;
      this.cd.detectChanges();
      return;
    }
  }

  private initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      zoom: 12,
      center: { lat: 37.7749, lng: -122.4194 },
      mapTypeId: 'roadmap',
    };
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
  }

  private renderRoute(): void {
  if (!this.summaryPolyline) {
    console.error('No polyline data available.');
    return;
  }

  const decodedPath = google.maps.geometry.encoding.decodePath(this.summaryPolyline);
  console.log('Decoded Path:', decodedPath); 

  const route = new google.maps.Polyline({
    path: decodedPath,
    geodesic: true,
    strokeColor: '#fc540b',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  route.setMap(this.map);

  const bounds = new google.maps.LatLngBounds();
  decodedPath.forEach((latLng: google.maps.LatLng) => {
    bounds.extend(latLng);
  });

  this.map.fitBounds(bounds);

  const listener = google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
    const currentZoom = this.map?.getZoom(); 
    if (currentZoom) { 
      this.map.setZoom(11);
    }
  });
  }  
}
