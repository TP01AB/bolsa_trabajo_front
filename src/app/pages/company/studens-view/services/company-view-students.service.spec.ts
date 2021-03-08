import { TestBed } from '@angular/core/testing';

import { CompanyViewStudentsService } from './company-view-students.service';

xdescribe('CompanyViewStudentsService', () => {
  let service: CompanyViewStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyViewStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
