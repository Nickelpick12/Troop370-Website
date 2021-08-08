import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentDbService } from '../../../backend/content-db.service';
import { BehaviorSubject } from 'rxjs';
import { PageData } from '../../../backend/page-data';
import { AuthService } from '../../../backend/auth.service';


@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {
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
  eventId: string;

  // HTML Var
  height: number;


  constructor(private contentDbService: ContentDbService, public domSanitizer: DomSanitizer, public authService: AuthService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      console.log(this.eventId);
      this.loadPageData();
    });
    
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
    });
  }


  loadPageData() {
    this.contentDbService.getPageData(`events/events/${this.eventId}`).subscribe(doc => {
      this.loaded.next(false);
      var nextPageData: PageData = {
        pageTitle: doc.pageTitle,
        pageBannerSrc: doc.pageBannerSrc,
        moreData: doc.moreData,
        sections: doc.sections
      }

      this.pageData.next(nextPageData);
      this.activePageData.next("pageData");
      if(this.pageData.value.sections.length != 0) {
        this.activeSection.next(this.pageData.value.sections[0].id);
      }
      this.loaded.next(true);
    });

    this.contentDbService.getSensitivePageData(`events/events/${this.eventId}`).subscribe(doc => {
      this.loaded.next(false);
      var nextPageData: PageData = {
        sections: doc.sections
      }
      this.sensitivePageData.next(nextPageData);
      this.loaded.next(true);
    });
  }

  
  pageDataEdit(pageDataType: string) { 
    this.activePageData.next(pageDataType);
  }


  // HTML Functions
  calcuatePanelBackgroundColor(pageDataType: string) {
    if(this.activePageData.value == pageDataType) {
      return "rgb(160, 160, 160)";
    } else {
      return "transparent";
    }
  }

  eventPath() {
    return `events/events/${this.eventId}`;
  }
}