import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PageData } from 'src/app/backend/page-data';
import { Section } from 'src/app/backend/section';
import { ContentDbService } from '../../../backend/content-db.service';
import { AuthService } from '../../../backend/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  pageData = new BehaviorSubject<PageData>({
    pageTitle: "",
    sections: []
  });
  sensitivePageData = new BehaviorSubject<PageData>({
    sections: []
  });

  loggedIn = false;
  password = "";
  loginError = ""

  // HTML Var
  height: number;

  constructor(private contentDbService: ContentDbService, public domSanitizer: DomSanitizer, public authService: AuthService) { }

  ngOnInit(): void {

    this.authService.user$.subscribe(res => {
      if(res != null) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    
      this.loadPageData();
    })
  }

  logInSensitive() {
    this.authService.passwordLogin(this.password).then(res => {
      console.log(res);
      this.loginError = "";
    }).catch(err => {
      console.log(err);
      this.loginError = err.message;
    })
  }

  logOut() {
    this.authService.logOut().then(res => {
      console.log(res);
    })
  }

  loadPageData() {
    this.contentDbService.getPageData('calendar').subscribe(doc => {
      var nextPageData: PageData = {
        pageTitle: doc.pageTitle,
        pageBannerSrc: doc.pageBannerSrc,
        moreData: doc.moreData,
        sections: doc.sections
      }
      this.pageData.next(nextPageData);
      
      if(this.loggedIn) {
        this.contentDbService.getSensitivePageData('calendar').subscribe(doc => {
          var nextPageData: PageData = {
            sections: doc.sections
          }
          this.sensitivePageData.next(nextPageData);
        });
      }
    });
  }
}