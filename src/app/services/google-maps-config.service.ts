import { Injectable } from '@angular/core';

@Injectable()
export class GoogleMapsConfigService {

  public map: google.maps.Map;

  constructor() { }

  public get googleMapInitialConfig() {
    return {
      center: new google.maps.LatLng(-11.9663551, -76.9843397),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    };
  }

  public getGoogleMap(element: HTMLDivElement) {
    const { googleMapInitialConfig } = this;
    return new google.maps.Map(element, googleMapInitialConfig);
  }
}
