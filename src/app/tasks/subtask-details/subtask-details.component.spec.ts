import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskDetailsComponent } from './subtask-details.component';

describe('SubtaskDetailsComponent', () => {
  let component: SubtaskDetailsComponent;
  let fixture: ComponentFixture<SubtaskDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtaskDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
