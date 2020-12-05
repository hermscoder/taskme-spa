import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunctualTasksComponent } from './punctual-tasks.component';

describe('PunctualTasksComponent', () => {
  let component: PunctualTasksComponent;
  let fixture: ComponentFixture<PunctualTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunctualTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunctualTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
