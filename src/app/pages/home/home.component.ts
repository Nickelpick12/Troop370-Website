import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentDbService } from '../../backend/content-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageData: any = [];

  constructor(private contentDbService: ContentDbService, public domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // this.contentDbService.getPageData("home").then(data => {
    //   console.log(data);
    //   this.pageData = data;
    // })
  }

  // sanitize(url: string) {
  //   console.log(url);
  //   return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  // }

}
