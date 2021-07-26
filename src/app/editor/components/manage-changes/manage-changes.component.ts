import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentDbService } from '../../../backend/content-db.service';
import { PageData } from '../../../backend/page-data';

@Component({
  selector: 'app-manage-changes',
  templateUrl: './manage-changes.component.html',
  styleUrls: ['./manage-changes.component.css']
})
export class ManageChangesComponent implements OnInit {
  @Input() pageData: BehaviorSubject<PageData>;
  @Input() sensitivePageData: BehaviorSubject<PageData>;
  @Input() loaded: BehaviorSubject<boolean>;
  @Input() pageId: string;
  @Input() loadPageData: Function;
  @Input() activePageData: BehaviorSubject<string>;
  @Input() activeSection: BehaviorSubject<string>;
  dirty: boolean = false;

  constructor(private contentDbService: ContentDbService) { }

  ngOnInit(): void {
    this.pageData.subscribe( (data: PageData) => {
      if(this.loaded.value) {
        this.dirty = true;
      } else {
        this.dirty = false;
      }
    });

    this.sensitivePageData.subscribe( (data: PageData) => {
      if(this.loaded.value) {
        this.dirty = true;
      } else {
        this.dirty = false;
      }
    });
  }

  submit() {
    this.contentDbService.setPageData(this.pageId, this.pageData.value);
    this.contentDbService.setSensitivePageData(this.pageId, this.sensitivePageData.value);
    this.dirty = false;
  }

  revert() {
    this.loadPageData();
  }
}
