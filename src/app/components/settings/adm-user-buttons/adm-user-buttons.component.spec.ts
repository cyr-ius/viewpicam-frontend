import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmUserButtonsComponent } from './adm-user-buttons.component';

describe('AdmUserButtonsComponent', () => {
  let component: AdmUserButtonsComponent;
  let fixture: ComponentFixture<AdmUserButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmUserButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmUserButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
