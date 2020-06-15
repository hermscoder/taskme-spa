import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskApplicantsListComponent } from './task-applicants-list.component';

describe('TaskApplicantsListComponent', () => {
  let component: TaskApplicantsListComponent;
  let fixture: ComponentFixture<TaskApplicantsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskApplicantsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskApplicantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
