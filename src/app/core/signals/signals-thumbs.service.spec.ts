import { TestBed } from '@angular/core/testing';

import { SignalsThumbsService } from './signals-thumbs.service';

describe('SignalsThumbsService', () => {
  let service: SignalsThumbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalsThumbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
