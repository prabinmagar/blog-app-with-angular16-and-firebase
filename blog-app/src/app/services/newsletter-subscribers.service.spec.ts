import { TestBed } from '@angular/core/testing';

import { NewsletterSubscribersService } from './newsletter-subscribers.service';

describe('NewsletterSubscribersService', () => {
  let service: NewsletterSubscribersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsletterSubscribersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
