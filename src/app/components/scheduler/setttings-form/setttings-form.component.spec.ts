import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetttingsFormComponent } from './setttings-form.component';

describe('SetttingsFormComponent', () => {
  let component: SetttingsFormComponent;
  let fixture: ComponentFixture<SetttingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetttingsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetttingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
