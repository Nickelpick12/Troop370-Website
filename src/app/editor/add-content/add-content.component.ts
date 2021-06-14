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
  @Input() activeSection: BehaviorSubject<String>;
  

  offSetX = 0;
  offSetY = 0;

  minimized = false;

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  newContent(type: string) {
    var nextPageData: PageData = this.pageData.value;

    for(var s = 0; s < nextPageData.sections.length; s++) {
      if(nextPageData.sections[s].id == this.activeSection.value) {
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
    
    this.pageData.next(nextPageData);
  }

  newSection() {
    var nextPageData: PageData = this.pageData.value;
    nextPageData.sections.push({
      id: uuid(),
      contentBoxes: []
    })
    this.pageData.next(nextPageData);
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