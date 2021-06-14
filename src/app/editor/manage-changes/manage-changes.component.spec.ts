import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChangesComponent } from './manage-changes.component';

describe('ManageChangesComponent', () => {
  let component: ManageChangesComponent;
  let fixture: ComponentFixture<ManageChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
