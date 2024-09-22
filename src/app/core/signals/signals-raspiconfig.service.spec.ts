import { TestBed } from '@angular/core/testing';

import { SignalsRaspiconfigService } from './signals-raspiconfig.service';

describe('SignalsRaspiconfigService', () => {
  let service: SignalsRaspiconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalsRaspiconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
