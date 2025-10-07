import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { iCoordenades } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  async getCurrentPosition() {
    const currPos = await Geolocation.getCurrentPosition();
    console.log('Current position: ', currPos);
    const coords: iCoordenades = {
      latitude: currPos.coords.latitude,
      longitude: currPos.coords.longitude
    };
    return coords;
  }

}
  