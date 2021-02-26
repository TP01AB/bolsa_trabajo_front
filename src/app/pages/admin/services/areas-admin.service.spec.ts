import { TestBed } from '@angular/core/testing';

import { AreasAdminService } from './areas-admin.service';

describe('AreasAdminService', () => {
  let service: AreasAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreasAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
