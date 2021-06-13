import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFileViewerComponent } from './client-file-viewer.component';

describe('ClientFileViewerComponent', () => {
  let component: ClientFileViewerComponent;
  let fixture: ComponentFixture<ClientFileViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFileViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFileViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
