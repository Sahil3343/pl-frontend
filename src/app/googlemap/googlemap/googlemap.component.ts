import { Component, OnInit } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent {

  ngOnInit(): void { }

  display: any;
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;

  readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;

  constructor(mapDirectionsService: MapDirectionsService) {
    const request: google.maps.DirectionsRequest = {
      destination: sessionStorage.getItem('end')!,
      origin: sessionStorage.getItem('start')!,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = mapDirectionsService.route(request).pipe(map((response => response.result)));
  }

  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
   }
}



