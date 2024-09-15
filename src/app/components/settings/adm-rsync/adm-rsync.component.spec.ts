import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmRSyncComponent } from './adm-rsync.component';

describe('AdmRSyncComponent', () => {
  let component: AdmRSyncComponent;
  let fixture: ComponentFixture<AdmRSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmRSyncComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmRSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
