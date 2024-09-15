import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbsListComponent } from './thumbs-list.component';

describe('ThumbsListComponent', () => {
  let component: ThumbsListComponent;
  let fixture: ComponentFixture<ThumbsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThumbsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
