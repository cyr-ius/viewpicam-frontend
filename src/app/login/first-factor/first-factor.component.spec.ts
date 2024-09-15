import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstFactorComponent } from './first-factor.component';

describe('FirstFactorComponent', () => {
  let component: FirstFactorComponent;
  let fixture: ComponentFixture<FirstFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstFactorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
