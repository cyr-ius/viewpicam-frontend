import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbListOrderingComponent } from './thumb-list-ordering.component';

describe('ThumbListOrderingComponent', () => {
  let component: ThumbListOrderingComponent;
  let fixture: ComponentFixture<ThumbListOrderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThumbListOrderingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbListOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
