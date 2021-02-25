import { TestBed } from '@angular/core/testing';

import { CompanyViewStudentsService } from './company-view-students.service';

describe('CompanyViewStudentsService', () => {
  let service: CompanyViewStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyViewStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
