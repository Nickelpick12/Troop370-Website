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
    // var rawData: any = (await this.db.doc(`pages/${page}`).get().toPromise()).data();
    // var pageData: PageData = {
    //   pageTitle: rawData.pageTitle,
    //   sections: rawData.sections
    // }
    // return pageData;

    return this.db.doc(`pageData/${page}`).valueChanges();
  }

  async setPageData (page: string, pageData: PageData) {
    var res = await (this.db.doc(`pageData/${page}`).set(pageData));
    return res;
  }
}
