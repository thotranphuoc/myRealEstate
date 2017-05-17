import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


import { iSetting } from '../interfaces/setting.interface';

@Injectable()
export class AngularFireService {
    SETTINGS: iSetting = {
        setHouse: true,
        setApartment: true,
        setLand: true,
        setOther: true,
        language: 'English'
    }
    loadCtrl: any;
    items: FirebaseListObservable<any[]>;
    item: FirebaseObjectObservable<any>;
    constructor(
        private db: AngularFireDatabase) {

    }

    getObject(URL: string){
        return this.item = this.db.object(URL);
    }
    
    removeObject(URL: string){
        return this.db.object(URL).remove();
    }

    // destructive updates: delete and create again @same url
    setObjectData(URL: string, data: any){
        return this.db.object(URL).set(data)
    }

    // non-destructive update
    updateObjectData(URL: string, data: any){
        return this.db.object(URL).update(data);
    }

    getObjectSnapshot(URL: string){
        return this.db.object(URL, { preserveSnapshot: true})
        // .subscribe( snapshot=>{
        //     return { key: snapshot.key, value: snapshot.val()}
        // })
    }




}

/*
1. install
$ npm install firebase angularfire2 --save
 */