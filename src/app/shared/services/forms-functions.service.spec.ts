import { TestBed } from '@angular/core/testing';

import { FormsFunctionsService } from './forms-functions.service';

describe('FormsFunctionsService', () => {
  let service: FormsFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
