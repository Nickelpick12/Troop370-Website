import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentDbService } from 'src/app/backend/content-db.service';
import { PageData } from 'src/app/backend/page-data';

@Component({
  selector: 'app-manage-changes',
  templateUrl: './manage-changes.component.html',
  styleUrls: ['./manage-changes.component.css']
})
export class ManageChangesComponent implements OnInit {
  @Input() pageData: BehaviorSubject<PageData>;
  @Input() loaded: BehaviorSubject<boolean>;
  @Input() pageId: string;
  @Input() loadPageData: Function;
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
  }

  submit() {
    this.contentDbService.setPageData(this.pageId, this.pageData.value);
  }

  revert() {
    this.loadPageData();
  }
}
