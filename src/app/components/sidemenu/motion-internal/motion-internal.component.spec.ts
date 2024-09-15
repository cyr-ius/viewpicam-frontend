import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotionInternalComponent } from './motion-internal.component';

describe('MotionInternalComponent', () => {
  let component: MotionInternalComponent;
  let fixture: ComponentFixture<MotionInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotionInternalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotionInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
