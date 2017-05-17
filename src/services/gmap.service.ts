import { Injectable } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

import { DbService } from './db.service';

import { PopoverInfoPage } from '../pages/popover-info/popover-info';
import { iSoldItem } from '../interfaces/sold-item.interface';

@Injectable()

export class GmapService {
  userLatLng: any;
  constructor(
    private dbService: DbService,
    private popoverCtrl: PopoverController) { }

  getDistanceFrom2PointInKm(lat1, lng1, lat2, lng2) {
    let R = 6371; // Raidus of the earth in km ;
    let dLat = this.degree2radius(lat2 - lat1);
    let dLng = this.degree2radius(lng2 - lng1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.degree2radius(lat1)) * Math.cos(this.degree2radius(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // distance in km
    return d;
  }

  degree2radius(deg: number) {
    return deg * (Math.PI / 180);
  }

  getCurrentLocation() {
    var position = { lat: 0, lng: 0 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        this.userLatLng = pos;
        this.dbService.setUserCurrentPosition(position);
        console.log('current position:', position)

      })
    } else {
      // browser doesnot support Geolocation
      console.log('your browser not support Geolocation');
    }
    return position;
  }

  getCurrentLocationReturnPromise() {
    return new Promise((resolve, reject) => {
      var position = { lat: 0, lng: 0 };
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          position = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
          this.userLatLng = pos;
          this.dbService.setUserCurrentPosition(position);
          console.log('current position:', position)
          resolve(position);

        })
      } else {
        // browser doesnot support Geolocation
        console.log('your browser not support Geolocation');
        reject('your browser not support Geolocation')
      }
    })
  }

  nav2CurrentPostion(map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        let position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }

        this.dbService.setUserCurrentPosition(position);
        map.setCenter(position);

        // add marker
        this.addMarkerToMap(map, position);

        // let infoWindow = new google.maps.InfoWindow({
        //   content: 'You are here',
        //   position: position
        // }).open(map);


        console.log('pos:', pos);
        console.log('Your current position: ', position);
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        console.log('latLng: ', latLng);
        let myPosition = {
          lat: latLng.lat(),
          lng: latLng.lng()
        }
        console.log('myPosition: ', myPosition);

      }, (err) => {
        console.log(err)
      })

    } else {
      // browser doesnot support Geolocation
      console.log('your browser not support Geolocation');
    }
  }



  nav2CurrentPostionWithoutMarker(map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        let position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        this.dbService.setUserCurrentPosition(position);
        map.setCenter(position);

        // add marker
        // this.addMarkerToMap(map,position);

        // let infoWindow = new google.maps.InfoWindow({
        //   content: 'You are here',
        //   position: position
        // }).open(map);

        console.log('Your current position: ', position);

      }, (err) => {
        console.log(err)
      })
    } else {
      // browser doesnot support Geolocation
      console.log('your browser not support Geolocation');
    }
  }

  addMarkerToMap(map: any, position: any) {
    let marker = new google.maps.Marker({
      position: position,
      map: map
    })

    marker.addListener('click', () => {
      console.log('marker clicked')
      //   let content = 'Lat: '+latLng.lat + ', Lng: '+latLng.lng;
      //   this.showInfoWindow(content, latLng, map, marker);
      let infoObject = {
        position: position,
        imgUrl: 'http://tanthoidai.com.vn/images/gallery/images/D%E1%BB%B1%20%C3%A1n%20Vinhomes%20Riverside/biet-thu-Vinhomes-Riverside-ngoai-tha.jpg',
        price: '1 tỷ 500',
        dtSan: '100m2 sàn',
        dtSd: '300m2 sử dụng'
      }
      let popover = this.popoverCtrl.create(PopoverInfoPage, infoObject);
      popover.present();
    })
  }

  addMarkerToMapWithID(map: any, soldItemKey: { key: string, data: iSoldItem }) {
    return new Promise((resolve, reject) => {
      let position = new google.maps.LatLng(soldItemKey.data.POSITION.lat, soldItemKey.data.POSITION.lng);
      let marker = new google.maps.Marker({
        position: position,
        map: map
      })

      marker.addListener('click', () => {
        let imgUrl= '';
        console.log('marker clicked')
        let infoObject = {
          position: position,
          imgUrl: imgUrl,
          price: soldItemKey.data.PRICE,
          dtSan: soldItemKey.data.GROUNDSQUARES,
          dtSd: soldItemKey.data.USEDSQUARES
        }

        let infoObjects = soldItemKey;
        let popover = this.popoverCtrl.create(PopoverInfoPage, infoObjects);
        popover.present();
      })
      resolve();
    })
  }

  // addOneMarkerToMap(map: any, latLng: any){

  //   this.userMarker = new google.maps.Marker({
  //     position: latLng,
  //     map: map
  //   });
  //   markersArray.push(marker);
  // }

  showInfoWindow(content: any, position: any, map: any, obj: any) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,
      position: position
    });
    infoWindow.open(map, obj);
  }

  loadLocation(map) {
    let locations = [];
    locations = this.dbService.getLocations();
    console.log(locations);
    locations.forEach(location => {
      this.addMarkerToMap(map, location);
    })
  }

  // load an array of location.
  loadLocationsToMap(map, locations: any[]) {
    locations.forEach(location => {
      this.addMarkerToMap(map, location);
    })
  }

  loadLocationToMap(map, location: any) {
    this.addMarkerToMap(map, location);
  }


  initMapForElementId(map, mapID) {
    let latLng = new google.maps.LatLng(0, 0);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById(mapID), mapOptions);
    // this.gmapService.nav2CurrentPostion(map);
    // this.gmapService.loadLocation(map);

  }

  initMapForElementIdWithCenterZoomType(mapID, center, zoom) {

    return new Promise((resolve, reject) => {
      let mapOptions = {
        center: center,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      let map = new google.maps.Map(document.getElementById(mapID), mapOptions);
      // this.gmapService.nav2CurrentPostion(map);
      // this.gmapService.loadLocation(map);
      if (map) {
        resolve();
      }
    })
  }

}