import { TestBed } from '@angular/core/testing';

import { RapportService } from '../../../services/api/rapport/rapport';

describe('Rapport', () => {
  let service: RapportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
