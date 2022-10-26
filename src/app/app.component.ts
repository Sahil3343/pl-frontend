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



  StartAddress: string = "";
  Endaddress: string = "";

  location = new FormGroup({
    start: new FormControl(''),
    destination: new FormControl('')
  })

  public GetStartAddressChange(address: any) {
    this.StartAddress = address.formatted_address;
    this.location.setValue({
      start: this.StartAddress,
      destination: this.Endaddress
    })
    
  }

  public GetEndAddress(address: any) {
    this.Endaddress = address.formatted_address;
    this.location.setValue({
      start: this.StartAddress,
      destination: this.Endaddress
    })

  }

  condition = false;
  errorCheck = false;
  displaydata = false;

  locations: any = {
    distance: "",
    duration: "",
    latLangs: [{ lat: 13, lng: 13 }],
    StartLocation: "",
    DestinationLocation: "",
    ErrorMessage: ""
  }

  constructor(private locationData: DistanceDataService) {
  }


  queryBuilder: string = "";

  calculateDistance = () => {
    this.condition = false;
    this.locations.distance = "";
    this.locations.duration = "";
    this.displaydata = false;
    this.locations.ErrorMessage = ""


    if (this.location.value.start === "" || this.location.value.destination === "") {
      this.errorCheck = true;
      this.condition = false;
      this.locations.ErrorMessage = "Invalid/Empty Locations. Please select the locations again!!"
    }
    else if (this.location.value.start == this.location.value.destination) {
      this.errorCheck = true;
      this.condition = false;
      this.locations.ErrorMessage = "Start and Destination locations cannot be the same. Please select the locations again!!"
      // this.StartAddress = "";
      // this.Endaddress = ""
      // if (this.location.valid) {
      //   this.location.reset();
      // }
    }
    else {
      this.queryBuilder = `start=${this.location.value.start}&end=${this.location.value.destination}`;
      this.locationData.getLocationDistance(this.queryBuilder).subscribe((result) => {
        this.locations = result;
        this.errorCheck = false;
        if (this.locations.status == "error") {
          this.errorCheck = true;
          this.condition = false;
          this.locations.ErrorMessage = "Sorry, we could not calculate driving directions!!"
        } else {
          this.condition = false;
          sessionStorage.setItem('start', this.location.value.start!);
          sessionStorage.setItem('end', this.location.value.destination!);
          this.locations.StartLocation = this.location.value.start;
          this.locations.DestinationLocation = this.location.value.destination;
          this.condition = true
          this.displaydata = true;
          this.StartAddress = "";
          this.Endaddress = ""
          // if (this.location.valid) {
          //   //this.location.reset();
          // }
        }
      })
    }
  }

}
