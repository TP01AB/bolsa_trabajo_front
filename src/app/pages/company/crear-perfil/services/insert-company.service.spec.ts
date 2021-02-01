import { TestBed } from '@angular/core/testing';

import { InsertCompanyService } from './insert-company.service';

describe('InsertCompanyService', () => {
  let service: InsertCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
