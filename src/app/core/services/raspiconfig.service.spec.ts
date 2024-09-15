import { TestBed } from '@angular/core/testing';

import { RaspiconfigService } from './raspiconfig.service';

describe('RaspiconfigService', () => {
  let service: RaspiconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaspiconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
