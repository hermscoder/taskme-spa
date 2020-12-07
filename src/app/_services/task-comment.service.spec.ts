import { TestBed, inject } from '@angular/core/testing';

import { TaskCommentService } from './task-comment.service';

describe('TaskCommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskCommentService]
    });
  });

  it('should be created', inject([TaskCommentService], (service: TaskCommentService) => {
    expect(service).toBeTruthy();
  }));
});
