import { TestBed } from '@angular/core/testing';

import { SignalsSettingsService } from './signals-settings.service';

describe('SignalsSettingsService', () => {
  let service: SignalsSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalsSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
