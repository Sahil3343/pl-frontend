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

  formattedaddress=" ";
  formattedaddress2=" ";
  
  public AddressChange(address: any) {
   this.formattedaddress=address.formatted_address
}

public AddressChange2(address: any) {
  this.formattedaddress2=address.formatted_address
}

  condition = false;
  errorCheck = false;

  locations: any = {
    distance: "",
    duration: "",
    latLangs: [{lat: 13,lng: 13}]
  }

  constructor(private locationData: DistanceDataService) {
  }

  location = new FormGroup({
    start: new FormControl(''),
    destination: new FormControl('')
  })

  queryBuilder: string = "";

  calculateDistance = () => {
    this.condition = false;
    this.queryBuilder = `start=${this.formattedaddress}&end=${this.formattedaddress2}`;
    this.locationData.getLocationDistance(this.queryBuilder).subscribe((result) => {
      this.locations = result;

      this.errorCheck = false;
      
      
      if(this.locations.status == "error") {
        this.errorCheck = true;
        this.condition = false;
      } else {

        this.condition = false;

        sessionStorage.setItem('start', this.formattedaddress);
        sessionStorage.setItem('end', this.formattedaddress2);

        this.condition = true
      }

      ;
    })
  }

}
