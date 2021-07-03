import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PageData } from 'src/app/backend/page-data';
import { Section } from 'src/app/backend/section';
import { ContentDbService } from '../../backend/content-db.service';

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

  // HTML Var
  height: number;

  constructor(private contentDbService: ContentDbService, public domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadPageData();
  }

  loadPageData() {
    this.contentDbService.getPageData('home').subscribe(doc => {
      var nextPageData: PageData = {
        pageTitle: doc.pageTitle,
        sections: doc.sections
      }
      this.pageData.next(nextPageData);
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