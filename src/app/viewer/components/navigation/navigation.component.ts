import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() pageBannerSrc: string;

  constructor() { }

  ngOnInit(): void {
    console.log("asdfasdf")
    console.log(this.pageBannerSrc)
  }

  src(url: string) {
    return `url(${url})`;
  }
}
