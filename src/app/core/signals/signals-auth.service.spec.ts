import { TestBed } from '@angular/core/testing';

import { SignalsAuthService } from './signals-auth.service';

describe('SignalsAuthService', () => {
  let service: SignalsAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalsAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
