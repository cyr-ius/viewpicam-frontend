import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MjpegViewerComponent } from './mjpeg-viewer.component';

describe('MjpegViewerComponent', () => {
  let component: MjpegViewerComponent;
  let fixture: ComponentFixture<MjpegViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MjpegViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MjpegViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
