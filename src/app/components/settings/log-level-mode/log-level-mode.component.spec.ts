import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogLevelModeComponent } from './log-level-mode.component';

describe('LogLevelModeComponent', () => {
  let component: LogLevelModeComponent;
  let fixture: ComponentFixture<LogLevelModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogLevelModeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogLevelModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
