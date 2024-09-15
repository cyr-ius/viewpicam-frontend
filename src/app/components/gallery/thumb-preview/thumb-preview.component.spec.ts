import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbPreviewComponent } from './thumb-preview.component';

describe('ThumbPreviewComponent', () => {
  let component: ThumbPreviewComponent;
  let fixture: ComponentFixture<ThumbPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThumbPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
