import { TestBed } from '@angular/core/testing';

import { SignalsSchedulerService } from './signals-scheduler.service';

describe('SignalsSchedulerService', () => {
  let service: SignalsSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalsSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
