import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MapService } from 'src/app/services/map.service';
import {GoogleMap, MapAdvancedMarker, MapMarker} from '@angular/google-maps';
import { iCoordenades } from 'src/app/models/interfaces';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, GoogleMap, MapAdvancedMarker]
})
export class Tab4Page implements OnInit, OnDestroy {

  mapService: MapService = inject(MapService);

  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };

  options = {
    zoom: 10
  };

  constructor() { }

  ngOnInit(): void {
    console.log('Tab4Page initialized');
  }

  ionViewWillEnter() {
    console.log('Tab4Page ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('Tab4Page ionViewDidEnter');
    this.mapService.getCurrentPosition().then(position => {
      console.log('Position in Tab4Page: ', position);
      this.center = {
        lat: position.latitude,
        lng: position.longitude
      };
    }).catch(err => {
      console.error('Error getting position in Tab4Page: ', err);
    });
  }

  ionViewWillLeave() {
    console.log('Tab4Page ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('Tab4Page ionViewDidLeave');
  }

  ngOnDestroy(): void {
    console.log('Tab4Page destroyed');
  }

  initMap() {

  }

}
