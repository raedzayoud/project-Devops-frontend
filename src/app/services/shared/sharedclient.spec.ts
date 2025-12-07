import { TestBed } from '@angular/core/testing';

import { SharedclientService } from '../../services/shared/sharedclient';

describe('Sharedclient', () => {
  let service: SharedclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
