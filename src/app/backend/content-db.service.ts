import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PageData } from './page-data'


@Injectable({
  providedIn: 'root'
})
export class ContentDbService {
  

  constructor( private db: AngularFirestore ) { }

  async getPageData (page: string) {
    var rawData: any = (await this.db.doc(`pages/${page}`).get().toPromise()).data();
    var pageData: PageData = {
      pageTitle: rawData.pageTitle,
      sections: rawData.sections
    }
    return pageData;
  }

  async setPageData (page: string, pageData: PageData) {
    var res = await (this.db.doc(`pages/${page}`).set(pageData));
    return res;
  }
}
