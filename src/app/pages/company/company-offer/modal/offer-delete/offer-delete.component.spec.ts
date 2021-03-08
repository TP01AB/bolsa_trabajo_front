import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDeleteComponent } from './offer-delete.component';

xdescribe('OfferDeleteComponent', () => {
  let component: OfferDeleteComponent;
  let fixture: ComponentFixture<OfferDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
