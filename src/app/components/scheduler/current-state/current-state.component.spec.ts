import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStateComponent } from './current-state.component';

describe('CurrentStateComponent', () => {
  let component: CurrentStateComponent;
  let fixture: ComponentFixture<CurrentStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
