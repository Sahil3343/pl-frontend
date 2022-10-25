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
  }

  public GetEndAddress(address: any) {
    this.Endaddress = address.formatted_address;

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


    if (this.StartAddress === "" || this.Endaddress === "") {
      this.errorCheck = true;
      this.condition = false;
      this.locations.ErrorMessage = "Invalid/Empty Locations. Please select the locations again!!"
    }
    else if (this.StartAddress == this.Endaddress) {
      this.errorCheck = true;
      this.condition = false;
      this.locations.ErrorMessage = "Start and Destination locations cannot be the same. Please select the locations again!!"
      this.StartAddress = "";
      this.Endaddress = ""
      if (this.location.valid) {
        this.location.reset();
      }
    }
    else {
      this.queryBuilder = `start=${this.StartAddress}&end=${this.Endaddress}`;
      this.locationData.getLocationDistance(this.queryBuilder).subscribe((result) => {
        this.locations = result;
        this.errorCheck = false;
        if (this.locations.status == "error") {
          this.errorCheck = true;
          this.condition = false;
          this.locations.ErrorMessage = "Sorry, we could not calculate driving directions!!"
        } else {
          this.condition = false;
          sessionStorage.setItem('start', this.StartAddress);
          sessionStorage.setItem('end', this.Endaddress);
          this.locations.StartLocation = this.StartAddress;
          this.locations.DestinationLocation = this.Endaddress;
          this.condition = true
          this.displaydata = true;
          this.StartAddress = "";
          this.Endaddress = ""
          if (this.location.valid) {
            this.location.reset();
          }
        }
      })
    }
  }

}
