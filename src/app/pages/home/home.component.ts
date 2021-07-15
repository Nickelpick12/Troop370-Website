import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PageData } from 'src/app/backend/page-data';
import { Section } from 'src/app/backend/section';
import { ContentDbService } from '../../backend/content-db.service';
import { AuthService } from '../../backend/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
      console.log(res)
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
    console.log("loading")
    this.contentDbService.getPageData('home').subscribe(doc => {
      var nextPageData: PageData = {
        pageTitle: doc.pageTitle,
        pageBannerSrc: doc.pageBannerSrc,
        moreData: doc.moreData,
        sections: doc.sections
      }
      this.pageData.next(nextPageData);
      
      if(this.loggedIn) {
        this.contentDbService.getSensitivePageData('home').subscribe(doc => {
          var nextPageData: PageData = {
            sections: doc.sections
          }
          this.sensitivePageData.next(nextPageData);
        });
      }
      
    });
  }

  // HTML Functions
  src(url: string) {
    return `url(${url})`;
  }

  calcuateGridTemplateRows(section: Section) {
    this.height = 1;
    section.contentBoxes.forEach(contentBox => {
      if(contentBox.yEnd > this.height) {
        this.height = contentBox.yEnd;
      }
    });
    this.height;
    return `repeat(${this.height-1}, 8.58vw)`;
  }
}