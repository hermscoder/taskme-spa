import { TestBed, inject } from '@angular/core/testing';

import { TaskApplicationService } from './task-application.service';

describe('TaskApplicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskApplicationService]
    });
  });

  it('should be created', inject([TaskApplicationService], (service: TaskApplicationService) => {
    expect(service).toBeTruthy();
  }));
});
