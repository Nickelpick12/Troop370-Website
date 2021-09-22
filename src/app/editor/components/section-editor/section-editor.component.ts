import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PageData } from 'src/app/backend/page-data';
import { Section } from 'src/app/backend/section';

@Component({
  selector: 'app-section-editor',
  templateUrl: './section-editor.component.html',
  styleUrls: ['./section-editor.component.css']
})
export class SectionEditorComponent implements OnInit {
  @Input() pageData: BehaviorSubject<PageData>;
  @Input() activePageData: BehaviorSubject<string>;
  @Input() activeSection: BehaviorSubject<string>;
  @Input() activeContent: BehaviorSubject<string>;
  @Input() pageDataType: string;
  @Input() imageObservable: BehaviorSubject<any>;


  // HTML Variables
  height: number;
  

  constructor(public domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }


  sectionEdit(sectionId: string) {
    this.activeSection.next(sectionId);
    this.activePageData.next(this.pageDataType);
  }


  deleteSection() {
    for(var s = 0; s < this.pageData.value.sections.length; s++) {
      if(this.pageData.value.sections[s].id == this.activeSection.value) {
        var nextPageData: PageData = this.pageData.value;
        nextPageData.sections.splice(s, 1);
        this.pageData.next(nextPageData);
        
        this.activeSection.next(this.pageData.value.sections[0].id);
        
        break;
      }
    }
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


  changePos(side: string, amount: number) {
    for(var s = 0; s < this.pageData.value.sections.length; s++) {
      if(this.pageData.value.sections[s].id == this.activeSection.value) {
        for(var c = 0; c < this.pageData.value.sections[s].contentBoxes.length; c++) {
          if(this.pageData.value.sections[s].contentBoxes[c].id == this.activeContent.value) {

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
  }


  deleteContent() {
    for(var s = 0; s < this.pageData.value.sections.length; s++) {
      if(this.pageData.value.sections[s].id == this.activeSection.value) {
        for(var c = 0; c < this.pageData.value.sections[s].contentBoxes.length; c++) {
          if(this.pageData.value.sections[s].contentBoxes[c].id == this.activeContent.value) {
            var nextPageData: PageData = this.pageData.value;
            nextPageData.sections[s].contentBoxes.splice(c, 1);
            this.pageData.next(nextPageData);
            break;
          }
        }
      }
    }
  }


  chooseImage(url: string) {
    console.log("Choolse")
    this.imageObservable.next({
      finished: false,
      url: url
    });
  }


  // HTML Functions
  calcuateBackgroundColor(sectionId: string) {
    if(sectionId == this.activeSection.value) {
      return "rgb(160, 160, 160)";
    } else {
      return "transparent";
    }
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
  

  src(url: string) {
    return `url(${url})`;
  }

  textDisplay(inText: string) {
    return inText.replace("([", "<a href='http://").replace("][", "' target='_blank'>").replace("])", "</a>")
  }
}
