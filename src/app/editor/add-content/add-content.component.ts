import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentBox } from 'src/app/backend/content-box';
import { PageData } from 'src/app/backend/page-data';
import { v1 as uuid } from 'uuid';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {
  @Input() pageData: BehaviorSubject<PageData>;
  @Input() sensitivePageData: BehaviorSubject<PageData>;
  @Input() activeSection: BehaviorSubject<String>;
  @Input() activePageData: BehaviorSubject<String>;
  
  
  offSetX = 0;
  offSetY = 0;

  minimized = false;

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  newContent(type: string) {
    if(this.activePageData.value == "pageData") {
      var nextPageData: PageData = this.pageData.value;
    } else {
      var nextPageData: PageData = this.sensitivePageData.value;
    }
    
    var foundSection = false;
    for(var s = 0; s < nextPageData.sections.length; s++) {
      if(nextPageData.sections[s].id == this.activeSection.value) {
        foundSection = true;
        // Find Lowest Y
        var yLowest: number = 1;
        nextPageData.sections[s].contentBoxes.forEach(contentBox => {
          if(contentBox.yEnd > yLowest) {
            yLowest = contentBox.yEnd;
          }});

        // Create New Content Box
        var newContentBox: ContentBox = {
          id: uuid(),
          type: "",
          xStart: 1,
          xEnd: 6,
          yStart: yLowest,
          yEnd: yLowest + 2,
          content: {}
        };
        switch (type) {
          case "image":
            newContentBox.type = "image",
            newContentBox.content = {
              src: ""
            };
            break;

          case "iframe":
            newContentBox.type = "iframe",
            newContentBox.content = {
              src: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d589.100654342518!2d-122.00262513483007!3d37.96732264377274!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808560afbeb5972b%3A0xed06baaa44123d07!2sSalvation%20Army!5e0!3m2!1sen!2sus!4v1623783730877!5m2!1sen!2sus"
            };
            break;

          case "test":
          default:
            newContentBox.type = "text",
            newContentBox.content = {
              header: "Empty Header",
              paragraph: "Write paragraph text here."
            };
        }

        // Add Content Box
        nextPageData.sections[s].contentBoxes.push(newContentBox);

        break;
      }
    }

    if(!foundSection) {
      this.newSection();
      this.newContent(type);
      return;
    }
    
    
    if(this.activePageData.value == "pageData") {
      this.pageData.next(nextPageData);
    } else {
      this.sensitivePageData.next(nextPageData);
    }
  }

  newSection() {
    var newSectionId = "";
    if(this.activePageData.value == "pageData") {
      var nextPageData: PageData = this.pageData.value;
      newSectionId = uuid();
      nextPageData.sections.push({
        id: newSectionId,
        contentBoxes: []
      })
      // console.log(newSectionId)
      this.pageData.next(nextPageData);
    } else {
      var nextPageData: PageData = this.sensitivePageData.value;
      newSectionId = uuid();
      nextPageData.sections.push({
        id: newSectionId,
        contentBoxes: []
      })
      // console.log(newSectionId)
      this.sensitivePageData.next(nextPageData);
    }
    this.activeSection.next(newSectionId);
  }

  startMove(e) {
    this.offSetY = (getPosition(e.currentTarget).top - e.pageY) - 5;
    this.offSetX = (getPosition(e.currentTarget).left - e.pageX) - 5;

  }

  move(e) {
    // console.log(e)
    if(!(e.clientY == 0 && e.clientX == 0)) {
      this.elRef.nativeElement.style.top = (e.clientY + this.offSetY) + "px";
      this.elRef.nativeElement.style.left = (e.clientX + this.offSetX) + "px";
    }
  }
}

function getPosition(elem) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}