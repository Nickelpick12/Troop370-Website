import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentDbService } from '../../backend/content-db.service';
import { BehaviorSubject } from 'rxjs';
import { PageData } from 'src/app/backend/page-data';
import { Section } from 'src/app/backend/section';
import { AuthService } from '../../backend/auth.service';

@Component({
  selector: 'app-home-editor',
  templateUrl: './home-editor.component.html',
  styleUrls: ['./home-editor.component.css']
})
export class HomeEditorComponent implements OnInit {
  activePageData = new BehaviorSubject<string>("");
  activeSection = new BehaviorSubject<string>("");
  activeContent = new BehaviorSubject<string>("");
  pageData = new BehaviorSubject<PageData>({
    pageTitle: "",
    sections: []
  });
  sensitivePageData = new BehaviorSubject<PageData>({
    sections: []
  });
  loaded = new BehaviorSubject<boolean>(false);
  imageObservable = new BehaviorSubject<any>({
    finished: true,
    url: ""
  });

  pageTitleObservable = new BehaviorSubject<string>("");
  pageBannerSrcObservable = new BehaviorSubject<string>("");

  loggedIn = false;
  password = ""

  // HTML Var
  height: number;

  constructor(private contentDbService: ContentDbService, public domSanitizer: DomSanitizer, public authService: AuthService) { }

  ngOnInit(): void {
    this.loadPageData();
    
    this.imageObservable.subscribe(obj => {
      if(obj.finished) {
        if(this.activePageData.value == "pageData") {
          var nextPageData: PageData = this.pageData.value;
          
          for(var s = 0; s < nextPageData.sections.length; s++) {
            if(nextPageData.sections[s].id == this.activeSection.value) {
              for(var c = 0; c < nextPageData.sections[s].contentBoxes.length; c++) {
                if(nextPageData.sections[s].contentBoxes[c].id == this.activeContent.value) {
                  nextPageData.sections[s].contentBoxes[c].content.src = obj.url;
                  break;
                }
              }
            }
          }

          this.pageData.next(nextPageData);
        } else {
          var nextPageData: PageData = this.sensitivePageData.value;
          
          for(var s = 0; s < nextPageData.sections.length; s++) {
            if(nextPageData.sections[s].id == this.activeSection.value) {
              for(var c = 0; c < nextPageData.sections[s].contentBoxes.length; c++) {
                if(nextPageData.sections[s].contentBoxes[c].id == this.activeContent.value) {
                  nextPageData.sections[s].contentBoxes[c].content.src = obj.url;
                  break;
                }
              }
            }
          }

          this.sensitivePageData.next(nextPageData);
        }
        
      }
    });

    this.authService.user$.subscribe(res => {
      console.log(res)
      if(res != null) {
        this.loggedIn = true;
      } else {
        this.loggedIn = true; // Change Back
      }
    })



    this.sensitivePageData.subscribe((sensitivePageData: PageData) => {
      if(sensitivePageData.sections.length == 0) {
        var nextPageData: PageData = this.pageData.value;
        nextPageData.moreData = false;
        this.pageData.next(nextPageData);
      } else {
        var nextPageData: PageData = this.pageData.value;
        nextPageData.moreData = true;
        this.pageData.next(nextPageData);
      }
    })


    this.pageTitleObservable.subscribe(pageTitle => {
      var nextPageData: PageData = this.pageData.value;
      nextPageData.pageTitle = pageTitle;
      this.pageData.next(nextPageData)
    });

    this.pageBannerSrcObservable.subscribe(pageBannerSrc => {
      var nextPageData: PageData = this.pageData.value;
      nextPageData.pageBannerSrc = pageBannerSrc;
      this.pageData.next(nextPageData)
    });
  }

  logInSensitive() {
    this.authService.passwordLogin(this.password).then(res => {
      console.log(res);
    })
  }

  loadPageData() {
    this.contentDbService.getPageData('home').subscribe(doc => {
      this.loaded.next(false);
      var nextPageData: PageData = {
        pageTitle: doc.pageTitle,
        pageBannerSrc: doc.pageBannerSrc,
        moreData: doc.moreData,
        sections: doc.sections
      }

      this.pageTitleObservable.next(doc.pageTitle);
      this.pageBannerSrcObservable.next(doc.pageBannerSrc);


      this.pageData.next(nextPageData);
      this.activePageData.next("pageData");
      this.activeSection.next(this.pageData.value.sections[0].id);

      this.contentDbService.getSensitivePageData('home').subscribe(doc => {
        var nextPageData: PageData = {
          sections: doc.sections
        }
        this.sensitivePageData.next(nextPageData);
        this.loaded.next(true);
      });
    });
  }

  contentBoxEdit(event: any, contentId: string) {
    // console.log(event)
    if(event.target.localName != "input" && event.target.localName != "textarea" && event.target.localName != "button" && event.target.id != "chooseImg") {
      if(this.activeContent.value == contentId) {
        this.activeContent.next("");
      } else {
        this.activeContent.next(contentId);
      }
    }
  }

  sectionEdit(sectionId: string, pageDataType: string) {
    this.activeSection.next(sectionId);
    this.activePageData.next(pageDataType);
  }

  pageDataEdit(pageDataType: string) {
    this.activePageData.next(pageDataType);
  }

  deleteContent(contentId: string, sectionId: string, pageDataType: String) {
    if(pageDataType == "pageData") {
      for(var s = 0; s < this.pageData.value.sections.length; s++) {
        if(this.pageData.value.sections[s].id == sectionId) {
          for(var c = 0; c < this.pageData.value.sections[s].contentBoxes.length; c++) {
            if(this.pageData.value.sections[s].contentBoxes[c].id == contentId) {
              var nextPageData: PageData = this.pageData.value;
              nextPageData.sections[s].contentBoxes.splice(c, 1);
              this.pageData.next(nextPageData);
              break;
            }
          }
        }
      }
    } else {
      for(var s = 0; s < this.sensitivePageData.value.sections.length; s++) {
        if(this.sensitivePageData.value.sections[s].id == sectionId) {
          for(var c = 0; c < this.sensitivePageData.value.sections[s].contentBoxes.length; c++) {
            if(this.sensitivePageData.value.sections[s].contentBoxes[c].id == contentId) {
              var nextPageData: PageData = this.sensitivePageData.value;
              nextPageData.sections[s].contentBoxes.splice(c, 1);
              this.sensitivePageData.next(nextPageData);
              break;
            }
          }
        }
      }
    }
    
  }

  deleteSection(sectionId: string, pageDataType: string) {
    if(pageDataType == "pageData") {
      for(var s = 0; s < this.pageData.value.sections.length; s++) {
        if(this.pageData.value.sections[s].id == sectionId) {
          var nextPageData: PageData = this.pageData.value;
          nextPageData.sections.splice(s, 1);
          this.pageData.next(nextPageData);
          
          this.activeSection.next(this.pageData.value.sections[0].id);
          
          break;
        }
      }
    } else {
      for(var s = 0; s < this.sensitivePageData.value.sections.length; s++) {
        if(this.sensitivePageData.value.sections[s].id == sectionId) {
          var nextPageData: PageData = this.sensitivePageData.value;
          nextPageData.sections.splice(s, 1);
          this.sensitivePageData.next(nextPageData);
          
          this.activeSection.next(this.pageData.value.sections[0].id);
          
          break;
        }
      }
    }
    
  }

  chooseImage(url: string) {
    this.imageObservable.next({
      finished: false,
      url: url
    });
  }

  changePos(side: string, amount: number, contentId: string, sectionId: string, pageDataType: string) {
    if(pageDataType == 'pageData') {
      for(var s = 0; s < this.pageData.value.sections.length; s++) {
        if(this.pageData.value.sections[s].id == sectionId) {
          for(var c = 0; c < this.pageData.value.sections[s].contentBoxes.length; c++) {
            if(this.pageData.value.sections[s].contentBoxes[c].id == contentId) {

              var newSidePos: number = this.pageData.value.sections[s].contentBoxes[c][side] + amount;

              if(newSidePos < 1) {
                alert("This is out of bonds");
                break;
              }
              if (side == "xEnd" && newSidePos > 11) {
                alert("This is out of bonds");
                break;
              }
              if (side == "xStart" && newSidePos >= this.pageData.getValue().sections[s].contentBoxes[c]["xEnd"]) {
                alert("An element cannot be this small");
                break;
              }
              if (side == "xEnd" && newSidePos <= this.pageData.getValue().sections[s].contentBoxes[c]["xStart"]) {
                alert("An element cannot be this small");
                break;
              }
              if (side == "yStart" && newSidePos >= this.pageData.getValue().sections[s].contentBoxes[c]["yEnd"]) {
                alert("An element cannot be this small");
                break;
              }
              if (side == "yEnd" && newSidePos <= this.pageData.getValue().sections[s].contentBoxes[c]["yStart"]) {
                alert("An element cannot be this small");
                break;
              }

              var nextPageData: PageData = this.pageData.value;
              nextPageData.sections[s].contentBoxes[c][side] = newSidePos;
              this.pageData.next(nextPageData);

              break;
            }
          }
        }
      }
    } else {
      for(var s = 0; s < this.sensitivePageData.value.sections.length; s++) {
        if(this.sensitivePageData.value.sections[s].id == sectionId) {
          for(var c = 0; c < this.sensitivePageData.value.sections[s].contentBoxes.length; c++) {
            if(this.sensitivePageData.value.sections[s].contentBoxes[c].id == contentId) {
  
              var newSidePos: number = this.sensitivePageData.value.sections[s].contentBoxes[c][side] + amount;
  
              if(newSidePos < 1) {
                alert("This is out of bonds");
                break;
              }
              if (side == "xEnd" && newSidePos > 11) {
                alert("This is out of bonds");
                break;
              }
              if (side == "xStart" && newSidePos >= this.sensitivePageData.getValue().sections[s].contentBoxes[c]["xEnd"]) {
                alert("An element cannot be this small");
                break;
              }
              if (side == "xEnd" && newSidePos <= this.sensitivePageData.getValue().sections[s].contentBoxes[c]["xStart"]) {
                alert("An element cannot be this small");
                break;
              }
              if (side == "yStart" && newSidePos >= this.sensitivePageData.getValue().sections[s].contentBoxes[c]["yEnd"]) {
                alert("An element cannot be this small");
                break;
              }
              if (side == "yEnd" && newSidePos <= this.sensitivePageData.getValue().sections[s].contentBoxes[c]["yStart"]) {
                alert("An element cannot be this small");
                break;
              }
  
              var nextPageData: PageData = this.sensitivePageData.value;
              nextPageData.sections[s].contentBoxes[c][side] = newSidePos;
              this.sensitivePageData.next(nextPageData);
  
              break;
            }
          }
        }
      }
    }
    
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
    this.height++;
    return `repeat(${this.height-1}, 8.58vw)`;
  }

  calcuateBackgroundColor(sectionId: string) {
    if(sectionId == this.activeSection.value) {
      return "rgb(160, 160, 160)";
    } else {
      return "transparent";
    }
  }

  calcuatePanelBackgroundColor(pageDataType: string) {
    if(this.activePageData.value == pageDataType) {
      return "rgb(160, 160, 160)";
    } else {
      return "transparent";
    }
  }
}