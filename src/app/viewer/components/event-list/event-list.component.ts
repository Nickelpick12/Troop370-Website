import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageData } from 'src/app/backend/page-data';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  @Input() pageData: BehaviorSubject<PageData>;

  constructor() { }

  ngOnInit(): void {
  }
  
  // HTML Functions
  eventUrl (id: string) {
    return `/events/${id}`;
  }
}