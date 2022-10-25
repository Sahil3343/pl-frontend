import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class DistanceDataService {

  URL = "https://plotline-express.azurewebsites.net/getDistance?";
  queryURL = "";

  constructor(private http : HttpClient) { }

  

  getLocationDistance = (data : string,) => {

    this.queryURL = `${this.URL}${data}`;

    return this.http.get(this.queryURL);
  }
}
