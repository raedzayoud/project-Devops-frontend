import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Voirproduits } from './voirproduits';

describe('Voirproduits', () => {
  let component: Voirproduits;
  let fixture: ComponentFixture<Voirproduits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Voirproduits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Voirproduits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
