import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmOptionsComponent } from './adm-options.component';

describe('AdmOptionsComponent', () => {
  let component: AdmOptionsComponent;
  let fixture: ComponentFixture<AdmOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
