import { TestBed } from '@angular/core/testing';

import { produitService } from '../produit/produit';

describe('Produit', () => {
  let service: produitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(produitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
