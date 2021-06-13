import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantCompaniesComponent } from './assistant-companies.component';

describe('AssistantCompaniesComponent', () => {
  let component: AssistantCompaniesComponent;
  let fixture: ComponentFixture<AssistantCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
