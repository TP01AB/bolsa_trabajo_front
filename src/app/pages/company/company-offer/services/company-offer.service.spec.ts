import { TestBed } from '@angular/core/testing';

import { CompanyOfferService } from './company-offer.service';

xdescribe('CompanyOfferService', () => {
  let service: CompanyOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
