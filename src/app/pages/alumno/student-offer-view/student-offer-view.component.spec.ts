import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOfferViewComponent } from './student-offer-view.component';

describe('StudentOfferViewComponent', () => {
  let component: StudentOfferViewComponent;
  let fixture: ComponentFixture<StudentOfferViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentOfferViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentOfferViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
