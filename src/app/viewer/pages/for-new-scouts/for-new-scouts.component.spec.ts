import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForNewScoutsComponent } from './for-new-scouts.component';

describe('ForNewScoutsComponent', () => {
  let component: ForNewScoutsComponent;
  let fixture: ComponentFixture<ForNewScoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForNewScoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForNewScoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
