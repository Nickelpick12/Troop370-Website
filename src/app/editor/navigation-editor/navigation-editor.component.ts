import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../backend/auth.service'

@Component({
  selector: 'app-navigation-editor',
  templateUrl: './navigation-editor.component.html',
  styleUrls: ['./navigation-editor.component.css']
})
export class NavigationEditorComponent implements OnInit {
  @Input() pageTitle: BehaviorSubject<string>;
  @Input() pageBannerSrc: BehaviorSubject<string>;

  imageObservable = new BehaviorSubject<any>({
    finished: true,
    url: ""
  });

  editing: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {

    this.imageObservable.subscribe(obj => {
      if(obj.finished) {
        this.pageBannerSrc.next(obj.url);
      }
    });
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
