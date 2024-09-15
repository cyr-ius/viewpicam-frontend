import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmUsersComponent } from './adm-users.component';

describe('AdmUsersComponent', () => {
  let component: AdmUsersComponent;
  let fixture: ComponentFixture<AdmUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
