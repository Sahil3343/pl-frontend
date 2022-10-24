import { query } from '@angular/animations';
import { Component } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { DistanceDataService } from './services/distance-data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plotline-assignment';

  locations : any = {
    distance : "",
    duration : ""
  }

  constructor(private locationData : DistanceDataService) {
    // this.locationData.users().subscribe((data) => {
    //   console.log(data);
    //   this.locations = data;
    // })
  }

  location = new FormGroup({
    start : new FormControl(''),
    destination : new FormControl('')
  })

  
  queryBuilder : string = "";

  calculateDistance = () => {
    //console.log(this.location.value);
    this.queryBuilder = `start=${this.location.value.start}&end=${this.location.value.destination}`;
    //console.log(this.queryBuilder);
    this.locationData.getLocationDistance(this.queryBuilder).subscribe((result) => {
      //console.log(result);
      this.locations = result;
    })
  }
}
