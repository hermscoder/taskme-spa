import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedTasksComponent } from './created-tasks.component';

describe('CreatedTasksComponent', () => {
  let component: CreatedTasksComponent;
  let fixture: ComponentFixture<CreatedTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
