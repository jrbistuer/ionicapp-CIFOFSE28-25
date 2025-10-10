import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import {GoogleMap, MapAdvancedMarker, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    GoogleMap, MapMarker, MapAdvancedMarker]
})
export class Tab4Page {

    title = "Tab 3 Sample";

  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };
  display!: google.maps.LatLngLiteral;
  options!: google.maps.MapOptions;
  loading?: HTMLIonLoadingElement;

  constructor() { }

    ionViewWillEnter() {
      this.initMap();
    }
  
    async initMap() {
      const coordinates = await Geolocation.getCurrentPosition();

      const location: google.maps.LatLngLiteral = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };

      this.center = location;
      this.display = location;

      this.options = {
        zoom: 10
      };
    }

}
