import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferEnrollComponent } from './offer-enroll.component';

xdescribe('OfferEnrollComponent', () => {
  let component: OfferEnrollComponent;
  let fixture: ComponentFixture<OfferEnrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferEnrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
