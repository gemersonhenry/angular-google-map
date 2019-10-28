import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { } from 'googlemaps';
import { GoogleMapsConfigService } from './services/google-maps-config.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('googleMap', { static: false }) googleMap: ElementRef<HTMLDivElement>;

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private googleMapConfig: GoogleMapsConfigService,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      searcher: new FormControl()
    });
  }

  ngAfterViewInit() {
    this.googleMapConfig.map = this.googleMapConfig.getGoogleMap(this.googleMap.nativeElement);
  }

  public get searcherControl() {
    return this.form.get('searcher') as FormControl;
  }

  public findPlaceFromQuery() {
    const address = this.searcherControl.value as string;
    const request = {
      query: address,
      fields: ['formatted_address', 'geometry', 'name', 'place_id'],
    };

    const service = new google.maps.places.PlacesService(this.googleMapConfig.map);

    service.findPlaceFromQuery( request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach(result => {
          console.log('result: ', result);
        });
        this.googleMapConfig.map.setCenter(results[0].geometry.location);
      }
    });
  }

  public textSearch() {
    const swPERU = new google.maps.LatLng(0.293111, -81.487189);
    const nePERU = new google.maps.LatLng(-18.355211, -67.482161);
    const boundsPERU = new google.maps.LatLngBounds(swPERU, nePERU);
    const address = this.searcherControl.value as string;
    const request = {
      bounds: boundsPERU,
      query: address
    };

    const service = new google.maps.places.PlacesService(this.googleMapConfig.map);
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach(result => {
          console.log('result: ', result);
        });
        this.googleMapConfig.map.setCenter(results[0].geometry.location);
      }
    });
  }

  public getDetails() {
    const request = {
      placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
      fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
    };

    const service = new google.maps.places.PlacesService(this.googleMapConfig.map);
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log('place: ', place);
      }
    });
  }

  public getGeocode() {
    const geocoder = new google.maps.Geocoder();
    const address = this.searcherControl.value as string;
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        this.googleMapConfig.map.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map: this.googleMapConfig.map,
          position: results[0].geometry.location
        });
        console.log('result: ', results);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  public getGeocodeReverse() {
    const geocoder = new google.maps.Geocoder();
    const PERU = new google.maps.LatLng(-9.1033593, -74.789343);
    geocoder.geocode({location: PERU}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.googleMapConfig.map.setZoom(11);
          const marker = new google.maps.Marker({
            position: PERU,
            map: this.googleMapConfig.map
          });
          console.log('results: ', results);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  public getGeocodePlaceId() {
    const placeId = '';
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.googleMapConfig.map.setZoom(11);
          this.googleMapConfig.map.setCenter(results[0].geometry.location);
          const marker = new google.maps.Marker({
            map: this.googleMapConfig.map,
            position: results[0].geometry.location
          });
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
