import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantsFileViewerComponent } from './assistants-file-viewer.component';

describe('AssistantsFileViewerComponent', () => {
  let component: AssistantsFileViewerComponent;
  let fixture: ComponentFixture<AssistantsFileViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantsFileViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantsFileViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
