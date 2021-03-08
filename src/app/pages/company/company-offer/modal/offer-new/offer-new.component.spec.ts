import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferNewComponent } from './offer-new.component';

xdescribe('OfferNewComponent', () => {
  let component: OfferNewComponent;
  let fixture: ComponentFixture<OfferNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
