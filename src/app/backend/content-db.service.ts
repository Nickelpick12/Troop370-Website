import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContentDbService {

  constructor( private db: AngularFirestore ) { }

  async getPageData (page: string) {
    return (await this.db.doc(`pages/${page}`).get().toPromise()).data()
  }
}
