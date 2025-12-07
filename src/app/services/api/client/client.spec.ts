import { TestBed } from '@angular/core/testing';

import { ClientService } from '../../../services/api/client/client';

describe('Client', () => {
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
