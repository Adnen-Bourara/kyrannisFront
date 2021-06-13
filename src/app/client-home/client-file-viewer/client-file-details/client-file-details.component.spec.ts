import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFileDetailsComponent } from './client-file-details.component';

describe('ClientFileDetailsComponent', () => {
  let component: ClientFileDetailsComponent;
  let fixture: ComponentFixture<ClientFileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFileDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
