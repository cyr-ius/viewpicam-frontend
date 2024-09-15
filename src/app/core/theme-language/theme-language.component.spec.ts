import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeLanguageComponent } from './theme-language.component';

describe('ThemeLanguageComponent', () => {
  let component: ThemeLanguageComponent;
  let fixture: ComponentFixture<ThemeLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeLanguageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
