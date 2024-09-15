import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraTokenComponent } from './camera-token.component';

describe('CameraTokenComponent', () => {
  let component: CameraTokenComponent;
  let fixture: ComponentFixture<CameraTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraTokenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
