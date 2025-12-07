import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tousventes } from './tousventes';

describe('Tousventes', () => {
  let component: Tousventes;
  let fixture: ComponentFixture<Tousventes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tousventes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tousventes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
