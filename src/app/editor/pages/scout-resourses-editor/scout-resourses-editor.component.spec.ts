import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutResoursesEditorComponent } from './scout-resourses-editor.component';

describe('ScoutResoursesEditorComponent', () => {
  let component: ScoutResoursesEditorComponent;
  let fixture: ComponentFixture<ScoutResoursesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoutResoursesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutResoursesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
