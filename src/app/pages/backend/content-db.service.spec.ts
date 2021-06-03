import { TestBed } from '@angular/core/testing';

import { ContentDbService } from './content-db.service';

describe('ContentDbService', () => {
  let service: ContentDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
