import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmMultiviewComponent } from './adm-multiview.component';

describe('AdmMultiviewComponent', () => {
  let component: AdmMultiviewComponent;
  let fixture: ComponentFixture<AdmMultiviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmMultiviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmMultiviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
