import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierDetailsComponent } from './fichier-details.component';

describe('FichierDetailsComponent', () => {
  let component: FichierDetailsComponent;
  let fixture: ComponentFixture<FichierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichierDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
