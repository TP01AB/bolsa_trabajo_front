import { TestBed } from '@angular/core/testing';

import { StudentOfferService } from './student-offer.service';

xdescribe('StudentOfferService', () => {
  let service: StudentOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
