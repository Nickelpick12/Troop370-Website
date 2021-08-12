import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForNewScoutsEditorComponent } from './for-new-scouts-editor.component';

describe('ForNewScoutsEditorComponent', () => {
  let component: ForNewScoutsEditorComponent;
  let fixture: ComponentFixture<ForNewScoutsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForNewScoutsEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForNewScoutsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
