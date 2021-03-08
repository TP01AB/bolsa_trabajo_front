import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOfferComponent } from './student-offer.component';

xdescribe('StudentOfferComponent', () => {
  let component: StudentOfferComponent;
  let fixture: ComponentFixture<StudentOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
