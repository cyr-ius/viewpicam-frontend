import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipanButtonsComponent } from './pipan-buttons.component';

describe('PipanButtonsComponent', () => {
  let component: PipanButtonsComponent;
  let fixture: ComponentFixture<PipanButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipanButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipanButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
