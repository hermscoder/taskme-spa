import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskApplicationCardComponent } from './task-application-card.component';

describe('TaskApplicationCardComponent', () => {
  let component: TaskApplicationCardComponent;
  let fixture: ComponentFixture<TaskApplicationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskApplicationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskApplicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
