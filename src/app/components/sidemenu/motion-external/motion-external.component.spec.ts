import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotionExternalComponent } from './motion-external.component';

describe('MotionExternalComponent', () => {
  let component: MotionExternalComponent;
  let fixture: ComponentFixture<MotionExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotionExternalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotionExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
