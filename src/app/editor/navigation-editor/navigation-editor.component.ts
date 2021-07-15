import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../backend/auth.service'

@Component({
  selector: 'app-navigation-editor',
  templateUrl: './navigation-editor.component.html',
  styleUrls: ['./navigation-editor.component.css']
})
export class NavigationEditorComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() pageBannerSrc: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    console.log("asdfasdf")
    console.log(this.pageBannerSrc)
  }

  src(url: string) {
    return `url(${url})`;
  }
}
