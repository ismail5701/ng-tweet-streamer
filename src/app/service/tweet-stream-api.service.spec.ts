import { TestBed } from '@angular/core/testing';

import { TweetStreamApiService } from './tweet-stream-api.service';

describe('TweetStreamApiService', () => {
  let service: TweetStreamApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetStreamApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
