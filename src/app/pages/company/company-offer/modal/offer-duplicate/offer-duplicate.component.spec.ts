import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDuplicateComponent } from './offer-duplicate.component';

xdescribe('OfferDuplicateComponent', () => {
  let component: OfferDuplicateComponent;
  let fixture: ComponentFixture<OfferDuplicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferDuplicateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
