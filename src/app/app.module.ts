import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SoldItemsPage } from '../pages/sold-items/sold-items';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// self services
import { AngularFireService } from '../services/af.service';

import { GoogleMaps } from '@ionic-native/google-maps';
// set up for angularfire2
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
// import enviroment
import { enviroment } from '../enviroments/enviroment'
// set up for firebase
import * as firebase from 'firebase';
const firebaseConfig = {
  
    apiKey: "AIzaSyAf1-QYPFKYvSP4zsgd1rAPgGv_vsEWCzE",
    authDomain: "auth-38cb7.firebaseapp.com",
    databaseURL: "https://auth-38cb7.firebaseio.com",
    storageBucket: "auth-38cb7.appspot.com",
    messagingSenderId: "304243304728"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SoldItemsPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(enviroment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SoldItemsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    AngularFireService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

/*
1. install firebase: 
$ npm install firebase --save


 */
