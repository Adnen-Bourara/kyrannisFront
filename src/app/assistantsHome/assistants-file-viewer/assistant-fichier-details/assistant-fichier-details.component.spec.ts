import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantFichierDetailsComponent } from './assistant-fichier-details.component';

describe('AssistantFichierDetailsComponent', () => {
  let component: AssistantFichierDetailsComponent;
  let fixture: ComponentFixture<AssistantFichierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantFichierDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantFichierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
