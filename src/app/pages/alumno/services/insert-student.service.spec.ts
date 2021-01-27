import { TestBed } from '@angular/core/testing';

import { InsertStudentService } from './insert-student.service';

describe('InsertStudentService', () => {
  let service: InsertStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
