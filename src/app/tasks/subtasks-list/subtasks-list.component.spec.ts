import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtasksListComponent } from './subtasks-list.component';

describe('SubtasksListComponent', () => {
  let component: SubtasksListComponent;
  let fixture: ComponentFixture<SubtasksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtasksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
