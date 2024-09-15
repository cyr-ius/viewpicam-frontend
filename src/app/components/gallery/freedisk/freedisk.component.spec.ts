import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreediskComponent } from './freedisk.component';

describe('FreediskComponent', () => {
  let component: FreediskComponent;
  let fixture: ComponentFixture<FreediskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreediskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreediskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
