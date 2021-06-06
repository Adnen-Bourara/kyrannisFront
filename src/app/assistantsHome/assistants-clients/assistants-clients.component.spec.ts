import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantsClientsComponent } from './assistants-clients.component';

describe('AssistantsClientsComponent', () => {
  let component: AssistantsClientsComponent;
  let fixture: ComponentFixture<AssistantsClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantsClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantsClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
