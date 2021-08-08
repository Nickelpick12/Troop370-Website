import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListEditorComponent } from './event-list-editor.component';

describe('EventListEditorComponent', () => {
  let component: EventListEditorComponent;
  let fixture: ComponentFixture<EventListEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventListEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
