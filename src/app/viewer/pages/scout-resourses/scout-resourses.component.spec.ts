import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutResoursesComponent } from './scout-resourses.component';

describe('ScoutResoursesComponent', () => {
  let component: ScoutResoursesComponent;
  let fixture: ComponentFixture<ScoutResoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoutResoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutResoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
