import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PageData } from './page-data'


@Injectable({
  providedIn: 'root'
})
export class ContentDbService {
  

  constructor( private db: AngularFirestore ) { }

  getPageData (page: string): Observable<PageData | any> {
    return this.db.doc(`pageData/${page}`).valueChanges();
  }

  getSensitivePageData(page: string): Observable<PageData | any> {
    return this.db.doc(`sensitivePageData/${page}`).valueChanges();
  }

  async setPageData (page: string, pageData: PageData) {
    var res = await (this.db.doc(`pageData/${page}`).set(pageData));
    return res;
  }

  async createNewEvent (eventId: string, eventName: string) {
    var eventData = {
      pageTitle: eventName,
      sections: [],
      pageBannerSrc: "",
      moreData: false
    }
    var res = await (this.db.doc(`pageData/events/events/${eventId}`).set(eventData));

    
    var eventData2 = {
      sections: []
    }
    var res2 = await (this.db.doc(`sensitivePageData/events/events/${eventId}`).set(eventData2));
    return [res, res2];
  }

  async deleteEvent (eventId: string) {
    
    var res = await (this.db.doc(`pageData/events/events/${eventId}`).delete());
    
    var res2 = await (this.db.doc(`sensitivePageData/events/events/${eventId}`).delete());
    return [res, res2];
  }

  async setSensitivePageData (page: string, pageData: PageData) {
    var res = await (this.db.doc(`sensitivePageData/${page}`).set(pageData));
    return res;
  }
}