import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Section } from '../../../backend/section';
import { PageData } from '../../../backend/page-data';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @Input() pageData: BehaviorSubject<PageData>;

  // HTML Variables
  height: number;

  constructor(public domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
