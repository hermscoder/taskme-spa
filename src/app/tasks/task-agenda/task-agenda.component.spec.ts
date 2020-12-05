import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAgendaComponent } from './task-agenda.component';

describe('TaskAgendaComponent', () => {
  let component: TaskAgendaComponent;
  let fixture: ComponentFixture<TaskAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
