import { TestBed } from '@angular/core/testing';

import { CategorieService } from '../../../services/api/categorie/categorie';

describe('Categorie', () => {
  let service: CategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
