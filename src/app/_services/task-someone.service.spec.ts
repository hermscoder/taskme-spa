/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskSomeoneService } from './task-someone.service';

describe('Service: TaskSomeone', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskSomeoneService]
    });
  });

  it('should ...', inject([TaskSomeoneService], (service: TaskSomeoneService) => {
    expect(service).toBeTruthy();
  }));
});
