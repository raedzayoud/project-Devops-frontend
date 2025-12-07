import { TestBed } from '@angular/core/testing';

import { FournisseurService } from '../fournisseur/fournisseur';

describe('Fournisseur', () => {
  let service: FournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FournisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
