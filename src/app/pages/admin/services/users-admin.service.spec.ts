import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { UsersAdminService } from './users-admin.service';

xdescribe('UsersAdminService', () => {
  let service: UsersAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpTestingController
      ]
    });
    service = TestBed.inject(UsersAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
