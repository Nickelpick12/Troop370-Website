import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PageData } from 'src/app/backend/page-data';
import { AuthService } from '../../../backend/auth.service'

@Component({
  selector: 'app-navigation-editor',
  templateUrl: './navigation-editor.component.html',
  styleUrls: ['./navigation-editor.component.css']
})
export class NavigationEditorComponent implements OnInit {
  // @Input() pageTitle: BehaviorSubject<string>;
  // @Input() pageBannerSrc: BehaviorSubject<string>;
  @Input() pageData: BehaviorSubject<PageData>;

  imageObservable = new BehaviorSubject<any>({
    finished: true,
    url: ""
  });

  editing: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.imageObservable.subscribe(obj => {
      if(obj.finished) {
        var nextPageData: PageData = this.pageData.value;
        nextPageData.pageBannerSrc = obj.url;
        this.pageData.next(nextPageData);
        // this.pageBannerSrc.next(obj.url);
      }
    });
  }

  logout() {
    this.authService.logOut().then(res => {
      console.log(res);
      this.router.navigate(['/home']);
    }).catch(err => {
      console.log(err);
    });
  }

  headerTextChange(event) {
    var nextpageData: PageData = this.pageData.value;
    nextpageData.pageTitle = event;
    this.pageData.next(nextpageData);
  }

  headerEdit(event: any) {
    if(event.target.localName != "a" && event.target.localName != "input") {
      this.editing = !this.editing;
    }
  }

  chooseImage(url: string) {
    this.imageObservable.next({
      finished: false,
      url: url
    });
  }

  src(url: string) {
    return `url(${url})`;
  }
}
