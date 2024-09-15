import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmMacrosComponent } from './adm-macros.component';

describe('AdmMacrosComponent', () => {
  let component: AdmMacrosComponent;
  let fixture: ComponentFixture<AdmMacrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmMacrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmMacrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
