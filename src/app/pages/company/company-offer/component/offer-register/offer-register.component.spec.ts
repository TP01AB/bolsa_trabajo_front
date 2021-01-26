import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferRegisterComponent } from './offer-register.component';

describe('OfferRegisterComponent', () => {
  let component: OfferRegisterComponent;
  let fixture: ComponentFixture<OfferRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
