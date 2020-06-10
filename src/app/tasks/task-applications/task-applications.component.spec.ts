import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskApplicationsComponent } from './task-applications.component';

describe('TaskApplicationsComponent', () => {
  let component: TaskApplicationsComponent;
  let fixture: ComponentFixture<TaskApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
