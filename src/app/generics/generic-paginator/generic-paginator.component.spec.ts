import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericPaginatorComponent } from './generic-paginator.component';

describe('GenericPaginatorComponent', () => {
  let component: GenericPaginatorComponent;
  let fixture: ComponentFixture<GenericPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
