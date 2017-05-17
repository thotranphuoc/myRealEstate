import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { iPosition} from '../../interfaces/position.interface';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('maphome') mapElement;

  maphome: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private googleMaps: GoogleMaps ) {
  }

  ngAfterViewInit(){
    this.loadMap();
  }

  loadMap(){
    let element: HTMLElement = document.getElementById('map')
    let map: GoogleMap = this.googleMaps.create(element);
    map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready');
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    // let latLng = new google.maps.LatLng(-34.99434, 138.5434);
    let userPosition = { lat:-34.99434, lng: 138.5434 }
    // this.initializeMap(userPosition);
  }

  initializeMap(position: iPosition){
    let mapOptions = {
      center: position,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    // display map
    this.maphome = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}

/*
install native/googlemaps
$ ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyCqdeCMOTXFM9N42mIdwuGGuc-N7qA8rAU" --variable API_KEY_FOR_IOS="AIzaSyDO-STMZUpSt6KkECjp_rNYqUZxRwQXFMA"
$ npm install --save @ionic-native/google-maps
*/
