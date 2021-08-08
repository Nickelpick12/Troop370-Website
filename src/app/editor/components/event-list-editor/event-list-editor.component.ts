import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageData } from 'src/app/backend/page-data';
import { ContentDbService } from 'src/app/backend/content-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list-editor',
  templateUrl: './event-list-editor.component.html',
  styleUrls: ['./event-list-editor.component.css']
})
export class EventListEditorComponent implements OnInit {
  @Input() pageData: BehaviorSubject<PageData>;

  constructor(private contentDbService: ContentDbService, private router: Router) { }

  ngOnInit(): void {
  }


  deleteEvent(eventObj: any) {
    console.log("Deleting");
    console.log(eventObj)

    var nextPageData = this.pageData.value;

    nextPageData.events.forEach((value,index)=>{
      if(value==eventObj) nextPageData.events.splice(index,1);
    });

    this.pageData.next(nextPageData);

    this.contentDbService.setPageData('events', this.pageData.value).then(()=> {
      this.contentDbService.deleteEvent(eventObj.id);
    });
  }

  addEvent() {
    var newEventName = "";
    while(newEventName == "") {
      newEventName = prompt("What is the name of the new event?");

      if (newEventName == "") {
        alert("The event must have a name, if you wish to cancel, press the cancel button");
      }
      if (newEventName == null) {
        return;
      }
    }
    
    var newEventId = newEventName;
    newEventId = newEventId.replace(/\s+/g, '-').toLowerCase();

    var nextPageData = this.pageData.value;
    nextPageData.events.push({
      name: newEventName,
      id: newEventId
    });
    this.pageData.next(nextPageData);

    this.contentDbService.setPageData('events', this.pageData.value).then(()=> {
      this.contentDbService.createNewEvent(newEventId, newEventName).then(()=> {
        this.router.navigate([`/editor/events/${newEventId}`]);
      });
    });
  }


  // HTML Functions
  eventUrl (id: string) {
    return `/editor/events/${id}`;
  }
}