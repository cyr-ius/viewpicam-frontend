import { TestBed } from '@angular/core/testing';

import { ThumbsService } from './thumbs.service';

describe('ThumbsService', () => {
  let service: ThumbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThumbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
